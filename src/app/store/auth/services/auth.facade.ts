import { PlatformService } from '../../../services/platform/platform.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { signInUser, signOutUser } from '../store/actions';

@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
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
