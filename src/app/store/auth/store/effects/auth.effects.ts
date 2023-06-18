import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AuthBackendService } from '../../services/auth.backend.service';
import * as authActions from '../actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';
import { LocalStorageKey } from '../../../../models/local-storage.model';
import { resetSignInUser } from '../actions';
import { PlatformService } from '../../../../services/platform/platform.service';

@Injectable()
export class AuthEffects implements OnInitEffects {
    private signInUser$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(authActions.signInUser),
                switchMap(() =>
                    this.authBackendService.signInUser().pipe(
                        map((userCredential) => {
                            const user = userCredential.user;
                            this.localStorageService.setItemOfType(LocalStorageKey.manualAuth, true);

                            return authActions.signInUserSuccess({
                                payload: {
                                    uid: user.uid,
                                    displayName: user.displayName || '',
                                    image: user?.photoURL || undefined,
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
                                if (user) {
                                    return authActions.signInUserSuccess({
                                        payload: {
                                            uid: user?.uid || '',
                                            displayName: user?.displayName || '',
                                            image: user?.photoURL || undefined,
                                        },
                                    });
                                }

                                return { type: 'NO_ACTION' };
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
                map(() => authActions.resetSignInUser())
            )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private authBackendService: AuthBackendService,
        private localStorageService: LocalStorageService,
        private platformService: PlatformService
    ) {}

    public ngrxOnInitEffects(): Action {
        if (this.platformService.isBrowser()) {
            return authActions.autoSignInUser();
        } else {
            return { type: 'NO_ACTION' };
        }
    }
}
