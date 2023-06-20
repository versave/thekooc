import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/index';
import { Nullable, RequestStateSlice } from '../../../../models/utils.model';
import { UserModel } from '../../../../models/user.model';

export type SaveUserState = RequestStateSlice<Nullable<UserModel>, Nullable<UserModel>>;

const initialState: SaveUserState = {
    data: null,
    requestArgs: null,
    loading: false,
    loaded: false,
    error: null,
};

export const saveUserReducer = createReducer(
    initialState,
    on(
        AuthActions.saveUser,
        (state, action): SaveUserState => ({
            ...initialState,
            requestArgs: action.payload,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        AuthActions.saveUserSuccess,
        (state, action): SaveUserState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        AuthActions.saveUserFail,
        (state, action): SaveUserState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
