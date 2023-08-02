import { ActionReducer, combineReducers } from '@ngrx/store';
import { getRecipesReducer, GetRecipesState } from './get-recipes.reducer';

export interface RecipesReducerState {
    getRecipes: GetRecipesState;
}

export const recipesReducers: ActionReducer<RecipesReducerState, any> = combineReducers({
    getRecipes: getRecipesReducer,
});
