import { PlatformService } from '../../../services/platform/platform.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addRecipe } from '../store/actions';
import { NewRecipeArgs } from '../../../models/recipe.model';

@Injectable({
    providedIn: 'root',
})
export class RecipeFacade {
    constructor(private store: Store, private platformService: PlatformService) {}

    public addRecipe(recipe: NewRecipeArgs): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(addRecipe({ payload: recipe }));
        }
    }
}
