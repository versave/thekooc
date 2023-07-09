import { PlatformService } from '../../../services/platform/platform.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addRecipe, getRecipe, updateRecipe } from '../store/actions';
import { NewRecipeArgs, RecipeData, UpdateRecipeArgs } from '../../../models/recipe.model';
import { Observable } from 'rxjs';
import {
    selectAddRecipeLoading,
    selectGetRecipeData,
    selectGetRecipeLoading,
    selectUpdateRecipeLoading,
} from '../store/selectors';

@Injectable({
    providedIn: 'root',
})
export class RecipeFacade {
    public getRecipeData$: Observable<RecipeData | null> = this.store.select(selectGetRecipeData);
    public getRecipeLoading$: Observable<boolean> = this.store.select(selectGetRecipeLoading);
    public addRecipeLoading$: Observable<boolean> = this.store.select(selectAddRecipeLoading);
    public updateRecipeLoading$: Observable<boolean> = this.store.select(selectUpdateRecipeLoading);

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
}
