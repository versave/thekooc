import { ActionReducer, combineReducers } from '@ngrx/store';
import { addRecipeReducer, AddRecipeState } from './add-recipe.reducer';
import { getRecipeReducer, GetRecipeState } from './get-recipe.reducer';
import { updateRecipeReducer, UpdateRecipeState } from './update-recipe.reducer';

export interface RecipeReducerState {
    getRecipe: GetRecipeState;
    addRecipe: AddRecipeState;
    updateRecipe: UpdateRecipeState;
}

export const recipeReducers: ActionReducer<RecipeReducerState, any> = combineReducers({
    getRecipe: getRecipeReducer,
    addRecipe: addRecipeReducer,
    updateRecipe: updateRecipeReducer,
});
