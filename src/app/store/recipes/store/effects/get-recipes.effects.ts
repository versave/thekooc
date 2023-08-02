import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as recipesActions from '../actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { selectSignInUser } from '../../../auth/store/selectors';
import { RecipesBackendService } from '../../services/recipes.backend.service';
import { RecipeObject } from '../../../../models/recipe.model';

@Injectable()
export class GetRecipesEffects {
    private getRecipes$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(recipesActions.getRecipes),
                switchMap((action) => {
                    return this.recipesBackendService.getRecipes<RecipeObject>(action.payload).pipe(
                        concatLatestFrom(() => this.store.select(selectSignInUser)),
                        map(([recipes, user]) => {
                            const mappedRecipes = recipes.docs.map((recipe) => ({
                                ...recipe.data(),
                                id: recipe.id,
                            }));
                            const filteredRecipes = mappedRecipes.filter((recipe) => {
                                if (recipe.private) {
                                    return recipe.author.uid === user?.uid;
                                } else {
                                    return true;
                                }
                            });

                            return recipesActions.getRecipesSuccess({ payload: filteredRecipes || [] });
                        }),
                        catchError((error) => {
                            return of(
                                recipesActions.getRecipesFail({
                                    payload: { error, message: 'Failed retrieving recipes' },
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
        private recipesBackendService: RecipesBackendService
    ) {}
}
