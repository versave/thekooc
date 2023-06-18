import { PlatformService } from '../../../services/platform/platform.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { signInUser, signOutUser } from '../store/actions';
import { Observable } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { selectSignInUser } from '../store/selectors';

@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
    public userData$: Observable<UserModel | null> = this.store.select(selectSignInUser);

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
}
