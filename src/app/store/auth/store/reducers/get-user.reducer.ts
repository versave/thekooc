import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/index';
import { Nullable, RequestStateSlice } from '../../../../models/utils.model';
import { UserModel } from '../../../../models/user.model';

export type GetUserState = RequestStateSlice<Nullable<UserModel>, Nullable<string>>;

const initialState: GetUserState = {
    data: null,
    requestArgs: null,
    loading: false,
    loaded: false,
    error: null,
};

export const getUserReducer = createReducer(
    initialState,
    on(
        AuthActions.getUser,
        (state, action): GetUserState => ({
            ...initialState,
            requestArgs: action.payload,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        AuthActions.getUserSuccess,
        (state, action): GetUserState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        AuthActions.getUserFail,
        (state, action): GetUserState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
