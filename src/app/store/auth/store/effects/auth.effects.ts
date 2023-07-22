import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AuthBackendService } from '../../services/auth.backend.service';
import * as authActions from '../actions';
import { resetSignInUser } from '../actions';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';
import { LocalStorageKey } from '../../../../models/local-storage.model';
import { PlatformService } from '../../../../services/platform/platform.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects implements OnInitEffects {
    private signInUser$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.signInUser),
                switchMap(() =>
                    this.authBackendService.signInUser().pipe(
                        map((userCredential) => {
                            // @ts-ignore
                            const isNewUser = !!userCredential?._tokenResponse?.isNewUser;
                            const user = userCredential.user;

                            return authActions.signInUserSuccess({
                                payload: {
                                    user: {
                                        uid: user.uid,
                                        displayName: user.displayName || '',
                                        image: user?.photoURL || undefined,
                                    },
                                    isNew: isNewUser,
                                },
                            });
                        }),
                        catchError((error) =>
                            of(authActions.signInUserFail({ payload: { error, message: 'Sign in failed' } }))
                        )
                    )
                )
            )
    );

    private signOutUser$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.signOutUser),
                switchMap(() =>
                    this.authBackendService.signOutUser().pipe(
                        map(() => {
                            this.localStorageService.removeItem(LocalStorageKey.manualAuth);
                            return authActions.signOutUserSuccess({ payload: true });
                        }),
                        catchError((error) =>
                            of(authActions.signOutUserFail({ payload: { error, message: 'Sign out failed' } }))
                        )
                    )
                )
            )
    );

    private autoSignInUser$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.autoSignInUser),
                concatLatestFrom(() =>
                    of(this.localStorageService.getItemOfType<boolean | null>(LocalStorageKey.manualAuth))
                ),
                switchMap(([action, manuallyLoggedIn]) => {
                    if (manuallyLoggedIn) {
                        return this.authBackendService.onAuthStateChanged().pipe(
                            map((user) => {
                                const manuallyLoggedInListenerTriggered = this.localStorageService.getItemOfType<
                                    boolean | null
                                >(LocalStorageKey.manualAuth);

                                if (user && manuallyLoggedInListenerTriggered) {
                                    return authActions.setSignInUser({
                                        payload: {
                                            uid: user?.uid || '',
                                            displayName: user?.displayName || '',
                                            image: user?.photoURL || undefined,
                                        },
                                    });
                                }

                                return { type: 'NO_ACTION: Auto Sign In' };
                            }),
                            catchError((error) =>
                                of(authActions.signInUserFail({ payload: { error, message: 'Auto sign in failed' } }))
                            )
                        );
                    } else {
                        return of(resetSignInUser());
                    }
                })
            )
    );

    private signOutUserSuccess$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.signOutUserSuccess),
                map(() => {
                    void this.router.navigate(['/']);
                    return authActions.resetSignInUser();
                })
            )
    );

    private signInUserSuccess$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.signInUserSuccess),
                switchMap((action) => {
                    const { user, isNew } = action.payload;

                    if (isNew) {
                        return of(authActions.saveUser({ payload: user }));
                    } else {
                        void this.router.navigate(['/']);
                        return of(authActions.setSignInUser({ payload: user }));
                    }
                })
            )
    );

    private setSignInUser$ = createEffect(
        (): Observable<void> =>
            this.actions$.pipe(
                ofType(authActions.setSignInUser),
                map(() => this.localStorageService.setItemOfType(LocalStorageKey.manualAuth, true))
            ),
        { dispatch: false }
    );

    private saveUser$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.saveUser),
                switchMap((action) =>
                    this.authBackendService.saveUser(action.payload).pipe(
                        map(() => authActions.saveUserSuccess({ payload: action.payload })),
                        catchError((error) => {
                            this.authBackendService.deleteUser();
                            return of(
                                authActions.saveUserFail({ payload: { error, message: 'Saving user to DB failed' } })
                            );
                        })
                    )
                )
            )
    );

    private getUser$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.getUser),
                switchMap((action) =>
                    this.authBackendService.getUser(action.payload).pipe(
                        map((userSnapshot) => {
                            if (userSnapshot.exists()) {
                                return authActions.getUserSuccess({ payload: userSnapshot.data() });
                            } else {
                                return authActions.getUserFail({
                                    payload: { error: null, message: 'User does not exist' },
                                });
                            }
                        }),
                        catchError((error) =>
                            of(
                                authActions.getUserFail({
                                    payload: { error, message: 'Trying to get user from DB failed' },
                                })
                            )
                        )
                    )
                )
            )
    );

    private saveUserSuccess$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.saveUserSuccess),
                map((action) => {
                    void this.router.navigate(['/']);
                    return authActions.setSignInUser({ payload: action.payload });
                })
            )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private authBackendService: AuthBackendService,
        private localStorageService: LocalStorageService,
        private platformService: PlatformService,
        private router: Router
    ) {}

    public ngrxOnInitEffects(): Action {
        if (this.platformService.isBrowser()) {
            return authActions.autoSignInUser();
        } else {
            return { type: 'NO_ACTION' };
        }
    }
}
