import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeReducerState } from '../reducers';

export const selectRecipeState = createFeatureSelector<RecipeReducerState>('recipe');

export const selectGetRecipeState = createSelector(selectRecipeState, (state) => state?.getRecipe || null);
export const selectGetRecipeData = createSelector(selectGetRecipeState, (state) => state?.data || null);

export const selectAddRecipeState = createSelector(selectRecipeState, (state) => state?.addRecipe || null);
export const selectAddRecipeRequest = createSelector(selectAddRecipeState, (state) => state?.requestArgs || null);

export const selectUpdateRecipeState = createSelector(selectRecipeState, (state) => state?.updateRecipe || null);
export const selectUpdateRecipeRequest = createSelector(selectUpdateRecipeState, (state) => state?.requestArgs || null);
