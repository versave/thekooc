import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../../../models/user.model';
import { StoreError } from '../../../../models/utils.model';

export const saveUser = createAction('[Auth] Save User', props<{ payload: UserModel }>());
export const saveUserSuccess = createAction('[Auth] Save User Success', props<{ payload: UserModel }>());
export const saveUserFail = createAction('[Auth] Save User Fail', props<{ payload: StoreError }>());

export type SaveUserActions = typeof saveUser | typeof saveUserSuccess | typeof saveUserFail;
