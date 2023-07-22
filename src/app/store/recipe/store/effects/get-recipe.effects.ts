import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as recipeActions from '../actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipeBackendService } from '../../services/recipe.backend.service';
import { selectSignInUser } from '../../../auth/store/selectors';
import { Router } from '@angular/router';

@Injectable()
export class GetRecipeEffects {
    private getRecipe$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(recipeActions.getRecipe),
                switchMap((action) => {
                    return this.recipeBackendService.getRecipe(action.payload).pipe(
                        concatLatestFrom(() => this.store.select(selectSignInUser)),
                        map(([recipe, user]) => {
                            const recipeExists = recipe.exists();

                            if (recipeExists) {
                                const data = recipe.data();

                                if (data?.private && data?.author?.uid !== user?.uid) {
                                    throw new Error();
                                }

                                return recipeActions.getRecipeSuccess({ payload: { ...data, id: recipe.id } });
                            } else {
                                throw new Error();
                            }
                        }),
                        catchError((error) => {
                            void this.router.navigate(['/404']);
                            return of(
                                recipeActions.getRecipeFail({
                                    payload: { error, message: 'Failed retrieving recipe data' },
                                })
                            );
                        })
                    );
                })
            )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private recipeBackendService: RecipeBackendService,
        private router: Router
    ) {}
}
