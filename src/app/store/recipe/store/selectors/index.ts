import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeReducerState } from '../reducers';

export const selectRecipeState = createFeatureSelector<RecipeReducerState>('recipe');

export const selectAddRecipeState = createSelector(selectRecipeState, (state) => state?.addRecipe || null);
export const selectAddRecipeRequest = createSelector(selectAddRecipeState, (state) => state?.requestArgs || null);
