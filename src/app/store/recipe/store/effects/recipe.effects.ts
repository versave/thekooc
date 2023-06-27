import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as recipeActions from '../actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipeBackendService } from '../../services/recipe.backend.service';

@Injectable()
export class RecipeEffects {
    private addRecipe$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(recipeActions.addRecipe),
                switchMap((action) =>
                    this.recipeBackendService.addRecipe(action.payload).pipe(
                        map(() => recipeActions.addRecipeSuccess({ payload: action.payload })),
                        catchError((error) =>
                            of(recipeActions.addRecipeFail({ payload: { error, message: 'Failed adding recipe' } }))
                        )
                    )
                )
            )
    );

    constructor(private actions$: Actions, private store: Store, private recipeBackendService: RecipeBackendService) {}
}
