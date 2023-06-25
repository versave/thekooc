import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthReducerState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthReducerState>('auth');

export const selectSignInState = createSelector(selectAuthState, (state) => state?.signIn || null);
export const selectSignInUser = createSelector(selectSignInState, (state) => state?.data || null);
export const selectSignInUserLoading = createSelector(selectSignInState, (state) => state.loading);

export const selectGetUserState = createSelector(selectAuthState, (state) => state?.getUser || null);
export const selectGetUserData = createSelector(selectGetUserState, (state) => state?.data || null);
export const selectGetUserLoading = createSelector(selectGetUserState, (state) => state.loading);
