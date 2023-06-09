import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/index';
import { Nullable, StateSlice } from '../../../../models/utils.model';
import { UserModel } from '../../../../models/user.model';

export type SignInState = StateSlice<Nullable<UserModel>>;

const initialState: SignInState = {
    data: null,
    loading: false,
    loaded: false,
    error: null,
};

export const signInReducer = createReducer(
    initialState,
    on(
        AuthActions.signInUser,
        AuthActions.autoSignInUser,
        (state, action): SignInState => ({
            ...initialState,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        AuthActions.setSignInUser,
        (state, action): SignInState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        AuthActions.signInUserFail,
        (state, action): SignInState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    ),
    on(AuthActions.resetSignInUser, (state, action): SignInState => initialState)
);
