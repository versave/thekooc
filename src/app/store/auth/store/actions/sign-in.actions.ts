import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';
import { UserModel } from '../../../../models/user.model';

export const signInUser = createAction('[Auth] Sign In User');
export const signInUserSuccess = createAction(
    '[Auth] Sign In User Success',
    props<{ payload: { user: UserModel; isNew: boolean } }>()
);
export const signInUserFail = createAction('[Auth] Sign In User Fail', props<{ payload: StoreError }>());
export const setSignInUser = createAction('[Auth] Set Sign In User', props<{ payload: UserModel }>());
export const autoSignInUser = createAction('[Auth] Auto Sign In User');
export const resetSignInUser = createAction('[Auth] Reset Sign In User');

export type SignInActions =
    | typeof signInUser
    | typeof signInUserSuccess
    | typeof signInUserFail
    | typeof autoSignInUser
    | typeof resetSignInUser;
