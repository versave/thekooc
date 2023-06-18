import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';

export const signInUser = createAction('[Auth] Sign In User');
// todo: Set proper payload type
export const signInUserSuccess = createAction('[Auth] Sign In User Success', props<{ payload: boolean }>());
export const signInUserFail = createAction('[Auth] Sign In User Fail', props<{ payload: StoreError }>());

export type SignInActions = typeof signInUser | typeof signInUserSuccess | typeof signInUserFail;
