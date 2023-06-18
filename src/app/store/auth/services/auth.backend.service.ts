import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthBackendService {
    public signInUser(): void {
        console.log('sign in user');
    }
}
