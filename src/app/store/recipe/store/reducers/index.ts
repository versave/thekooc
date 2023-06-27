import { ActionReducer, combineReducers } from '@ngrx/store';
import { addRecipeReducer, AddRecipeState } from './add-recipe.reducer';

export interface RecipeReducerState {
    addRecipe: AddRecipeState;
}

export const recipeReducers: ActionReducer<RecipeReducerState, any> = combineReducers({
    addRecipe: addRecipeReducer,
});
