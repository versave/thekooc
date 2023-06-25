import { ActionReducer, combineReducers } from '@ngrx/store';
import { signInReducer, SignInState } from './sign-in.reducer';
import { signOutReducer, SignOutState } from './sign-out.reducer';
import { saveUserReducer, SaveUserState } from './save-user.reducer';
import { getUserReducer, GetUserState } from './get-user.reducer';

export interface AuthReducerState {
    signIn: SignInState;
    signOut: SignOutState;
    saveUser: SaveUserState;
    getUser: GetUserState;
}

export const authReducers: ActionReducer<AuthReducerState, any> = combineReducers({
    signIn: signInReducer,
    signOut: signOutReducer,
    saveUser: saveUserReducer,
    getUser: getUserReducer,
});
