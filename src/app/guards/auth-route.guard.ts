import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from '../store/auth/services/auth.facade';
import { combineLatest, filter, map } from 'rxjs';

export const authRouteGuard: CanActivateFn = () => {
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    return combineLatest([authFacade.userData$, authFacade.userDataLoading$]).pipe(
        filter(([user, userLoading]) => !userLoading),
        map(([user, userLoading]) => {
            if (!!user && !userLoading) {
                return true;
            } else {
                void router.navigate(['/']);
                return false;
            }
        })
    );
};
