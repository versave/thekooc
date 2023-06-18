import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/index';
import { Nullable, StateSlice } from '../../../../models/utils.model';

export type SignOutState = StateSlice<Nullable<boolean>>;

const initialState: SignOutState = {
    data: null,
    loading: false,
    loaded: false,
    error: null,
};

export const signOutReducer = createReducer(
    initialState,
    on(
        AuthActions.signOutUser,
        (state, action): SignOutState => ({
            ...initialState,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        AuthActions.signOutUserSuccess,
        (state, action): SignOutState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        AuthActions.signOutUserFail,
        (state, action): SignOutState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
