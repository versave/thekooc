import { ActionReducer, combineReducers } from '@ngrx/store';
import { addRecipeReducer, AddRecipeState } from './add-recipe.reducer';
import { getRecipeReducer, GetRecipeState } from './get-recipe.reducer';
import { updateRecipeReducer, UpdateRecipeState } from './update-recipe.reducer';
import { deleteRecipeReducer, DeleteRecipeState } from './delete-recipe.reducer';

export interface SingleRecipeReducerState {
    getRecipe: GetRecipeState;
    addRecipe: AddRecipeState;
    updateRecipe: UpdateRecipeState;
    deleteRecipe: DeleteRecipeState;
}

export const singleRecipeReducers: ActionReducer<SingleRecipeReducerState, any> = combineReducers({
    getRecipe: getRecipeReducer,
    addRecipe: addRecipeReducer,
    updateRecipe: updateRecipeReducer,
    deleteRecipe: deleteRecipeReducer,
});
