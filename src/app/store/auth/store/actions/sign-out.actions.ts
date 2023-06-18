import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';

export const signOutUser = createAction('[Auth] Sign Out User');
export const signOutUserSuccess = createAction('[Auth] Sign Out User Success', props<{ payload: boolean }>());
export const signOutUserFail = createAction('[Auth] Sign Out User Fail', props<{ payload: StoreError }>());

export type SignOutActions = typeof signOutUser | typeof signOutUserSuccess | typeof signOutUserFail;
