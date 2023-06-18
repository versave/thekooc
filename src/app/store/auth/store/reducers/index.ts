import { ActionReducer, combineReducers } from '@ngrx/store';
import { signInReducer, SignInState } from './sign-in.reducer';
import { signOutReducer, SignOutState } from './sign-out.reducer';

export interface AuthReducerState {
    signIn: SignInState;
    signOut: SignOutState;
}

export const authReducers: ActionReducer<AuthReducerState, any> = combineReducers({
    signIn: signInReducer,
    signOut: signOutReducer,
});
