import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as recipeActions from '../actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipeBackendService } from '../../services/recipe.backend.service';
import { Router } from '@angular/router';

@Injectable()
export class DeleteRecipeEffects {
    private deleteRecipe$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(recipeActions.deleteRecipe),
                switchMap((action) => {
                    return this.recipeBackendService.deleteRecipe(action.payload).pipe(
                        map(() => {
                            void this.router.navigate(['/user']);
                            return recipeActions.deleteRecipeSuccess({ payload: action.payload });
                        }),
                        catchError((error) =>
                            of(
                                recipeActions.deleteRecipeFail({
                                    payload: { error, message: 'Failed trying to delete recipe' },
                                })
                            )
                        )
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
