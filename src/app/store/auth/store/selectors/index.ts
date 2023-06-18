import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthReducerState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthReducerState>('auth');
export const selectSignInState = createSelector(selectAuthState, (state) => state?.signIn || null);
export const selectSignInUser = createSelector(selectSignInState, (state) => state?.data || null);
