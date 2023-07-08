import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as recipeActions from '../actions';
import * as imageActions from '../../../image/store/actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipeBackendService } from '../../services/recipe.backend.service';
import { selectAddRecipeRequest } from '../selectors';
import { NewRecipeRequest } from '../../../../models/recipe.model';
import { selectSignInState } from '../../../auth/store/selectors';

@Injectable()
export class RecipeEffects {
    private addRecipe$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(recipeActions.addRecipe),
                concatLatestFrom(() => this.store.select(selectSignInState)),
                switchMap(([action, user]) => {
                    const hasImages = action.payload.images.length > 0;

                    if (hasImages) {
                        return of(
                            imageActions.addRecipeImages({
                                payload: {
                                    files: action.payload.images,
                                    folder: `recipes/${user?.data?.uid}`,
                                },
                            })
                        );
                    } else {
                        const recipeWithImages = { ...action.payload, images: [] };

                        return this.recipeBackendService.addRecipe(recipeWithImages).pipe(
                            map(() => recipeActions.addRecipeSuccess({ payload: recipeWithImages })),
                            catchError((error) =>
                                of(
                                    recipeActions.addRecipeFail({
                                        payload: { error, message: 'Failed adding recipe' },
                                    })
                                )
                            )
                        );
                    }
                })
            )
    );

    private addRecipeImagesSuccess$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(imageActions.addRecipeImagesSuccess),
                concatLatestFrom(() => this.store.select(selectAddRecipeRequest)),
                switchMap(([action, recipeRequest]) => {
                    const recipeWithImages = { ...recipeRequest, images: action.payload } as NewRecipeRequest;

                    return this.recipeBackendService.addRecipe(recipeWithImages).pipe(
                        map(() => recipeActions.addRecipeSuccess({ payload: recipeWithImages })),
                        catchError((error) =>
                            of(
                                recipeActions.addRecipeFail({
                                    payload: { error, message: 'Failed adding recipe' },
                                })
                            )
                        )
                    );
                })
            )
    );

    private addRecipeImagesFail$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(imageActions.addRecipeImagesFail),
                map((action) => recipeActions.addRecipeFail({ payload: action.payload }))
            )
    );

    constructor(private actions$: Actions, private store: Store, private recipeBackendService: RecipeBackendService) {}
}
