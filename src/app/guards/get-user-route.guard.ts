import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from '../store/auth/services/auth.facade';
import { combineLatest, filter, map } from 'rxjs';

export const getUserRouteGuard: CanActivateFn = (snapshot: ActivatedRouteSnapshot) => {
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    const uid = snapshot.params?.['uid'] as string;

    if (uid) {
        authFacade.getUser(uid);
    } else {
        void router.navigate(['/404']);
        return false;
    }

    return combineLatest([authFacade.getUserData$, authFacade.getUserDataLoading$]).pipe(
        filter(([user, userLoading]) => !userLoading),
        map(([user, userLoading]) => {
            if (!!user && !userLoading) {
                return true;
            } else {
                void router.navigate(['/404']);
                return false;
            }
        })
    );
};
