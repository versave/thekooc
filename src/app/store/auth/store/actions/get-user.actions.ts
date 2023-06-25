import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../../../models/user.model';
import { StoreError } from '../../../../models/utils.model';

export const getUser = createAction('[Auth] Get User', props<{ payload: string }>());
export const getUserSuccess = createAction('[Auth] Get User Success', props<{ payload: UserModel }>());
export const getUserFail = createAction('[Auth] Get User Fail', props<{ payload: StoreError }>());

export type GetUserActions = typeof getUser | typeof getUserSuccess | typeof getUserFail;
