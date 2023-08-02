import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipesReducerState } from '../reducers';

export const selectRecipesState = createFeatureSelector<RecipesReducerState>('recipes');

export const selectGetRecipesState = createSelector(selectRecipesState, (state) => state?.getRecipes || null);
export const selectGetRecipesData = createSelector(selectGetRecipesState, (state) => state?.data || null);
export const selectGetRecipesLoading = createSelector(selectGetRecipesState, (state) => !!state?.loading);
