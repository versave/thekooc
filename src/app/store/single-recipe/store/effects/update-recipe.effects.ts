import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SingleRecipeBackendService } from '../../services/single-recipe.backend.service';
import * as recipeActions from '../actions';
import * as imageActions from '../../../image/store/actions';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { selectSignInUser } from '../../../auth/store/selectors';
import { selectUpdateRecipeRequest } from '../selectors';
import { RecipeData } from '../../../../models/recipe.model';
import { Router } from '@angular/router';

@Injectable()
export class UpdateRecipeEffects {
    private updateRecipe$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                // todo: Handle this action a second time in order to delete images that were removed
                ofType(recipeActions.updateRecipe),
                concatLatestFrom(() => this.store.select(selectSignInUser)),
                switchMap(([action, user]) => {
                    const images = action.payload.recipe.images.filter((image) => image !== null);
                    const uploadableImages = images
                        .filter((image) => image.file !== null)
                        .map((image) => image.file) as File[];
                    const originalImages = images
                        ?.filter((image) => image.file === null && image.imageUrl !== null)
                        ?.map((image) => image.imageUrl) as string[];

                    // If there are images to upload -> upload images and then update recipe
                    if (uploadableImages?.length > 0) {
                        return of(
                            imageActions.updateRecipeImages({
                                payload: {
                                    uploadableImages,
                                    originalImages,
                                    folder: `recipes/${user?.uid}`,
                                },
                            })
                        );
                    } else {
                        // If there are no images to upload -> just update recipe with original images
                        const requestData = { ...action.payload.recipe, images: originalImages };

                        return this.recipeBackendService
                            .updateRecipe({
                                recipeId: action.payload.recipeId,
                                data: requestData,
                            })
                            .pipe(
                                map(() =>
                                    recipeActions.updateRecipeSuccess({
                                        payload: { ...requestData, id: action.payload.recipeId },
                                    })
                                ),
                                catchError((error) =>
                                    of(
                                        recipeActions.updateRecipeFail({
                                            payload: { error, message: 'Failed updating recipe data' },
                                        })
                                    )
                                )
                            );
                    }
                })
            )
    );

    private updateRecipeSuccess$ = createEffect(
        (): Observable<void> =>
            this.actions$.pipe(
                ofType(recipeActions.updateRecipeSuccess),
                map((action) => void this.router.navigate([`recipes/${action.payload.id}`]))
            ),
        { dispatch: false }
    );

    private updateRecipeImagesSuccess$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(imageActions.updateRecipeImagesSuccess),
                concatLatestFrom(() => this.store.select(selectUpdateRecipeRequest)),
                switchMap(([action, recipeRequest]) => {
                    const recipeWithImages = { ...recipeRequest?.recipe, images: action.payload } as RecipeData;

                    return this.recipeBackendService
                        .updateRecipe({ recipeId: recipeRequest?.recipeId || '', data: recipeWithImages })
                        .pipe(
                            map(() =>
                                recipeActions.updateRecipeSuccess({
                                    payload: { ...recipeWithImages, id: recipeRequest?.recipeId || '' },
                                })
                            ),
                            catchError((error) =>
                                of(
                                    recipeActions.updateRecipeFail({
                                        payload: { error, message: 'Failed updating recipe' },
                                    })
                                )
                            )
                        );
                })
            )
    );

    private updateRecipeImagesFail$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(imageActions.updateRecipeImagesFail),
                map((action) => recipeActions.updateRecipeFail({ payload: action.payload }))
            )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private recipeBackendService: SingleRecipeBackendService,
        private router: Router
    ) {}
}
