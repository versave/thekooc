import { PlatformService } from '../../../services/platform/platform.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser, signInUser, signOutUser } from '../store/actions';
import { Observable } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { selectGetUserData, selectGetUserLoading, selectSignInUser, selectSignInUserLoading } from '../store/selectors';

@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
    public userData$: Observable<UserModel | null> = this.store.select(selectSignInUser);
    public userDataLoading$: Observable<boolean> = this.store.select(selectSignInUserLoading);
    public getUserData$: Observable<UserModel | null> = this.store.select(selectGetUserData);
    public getUserDataLoading$: Observable<boolean> = this.store.select(selectGetUserLoading);

    constructor(private store: Store, private platformService: PlatformService) {}

    public signInUser(): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(signInUser());
        }
    }

    public signOutUser(): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(signOutUser());
        }
    }

    public getUser(uid: string): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(getUser({ payload: uid }));
        }
    }
}
