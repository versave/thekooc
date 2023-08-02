import { PlatformService } from '../../../services/platform/platform.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addRecipe, getRecipe, updateRecipe, deleteRecipe } from '../store/actions';
import { NewRecipeArgs, RecipeObject, UpdateRecipeArgs } from '../../../models/recipe.model';
import { Observable } from 'rxjs';
import {
    selectAddRecipeLoading,
    selectDeleteRecipeLoading,
    selectGetRecipeData,
    selectGetRecipeLoading,
    selectUpdateRecipeLoading,
} from '../store/selectors';

@Injectable({
    providedIn: 'root',
})
export class SingleRecipeFacade {
    public getRecipeData$: Observable<RecipeObject | null> = this.store.select(selectGetRecipeData);
    public getRecipeLoading$: Observable<boolean> = this.store.select(selectGetRecipeLoading);
    public addRecipeLoading$: Observable<boolean> = this.store.select(selectAddRecipeLoading);
    public updateRecipeLoading$: Observable<boolean> = this.store.select(selectUpdateRecipeLoading);
    public deleteRecipeLoading$: Observable<boolean> = this.store.select(selectDeleteRecipeLoading);

    constructor(private store: Store, private platformService: PlatformService) {}

    public getRecipe(id: string): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(getRecipe({ payload: id }));
        }
    }

    public addRecipe(recipe: NewRecipeArgs): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(addRecipe({ payload: recipe }));
        }
    }

    public updateRecipe(recipeId: string, recipe: UpdateRecipeArgs): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(
                updateRecipe({
                    payload: { recipeId, recipe },
                })
            );
        }
    }

    public deleteRecipe(recipeId: string): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(deleteRecipe({ payload: recipeId }));
        }
    }
}
