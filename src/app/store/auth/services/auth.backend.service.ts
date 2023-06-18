import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { UserCredential, User } from '@firebase/auth';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Injectable({
    providedIn: 'root',
})
export class AuthBackendService {
    private auth: Auth = inject(Auth);

    public signInUser(): Observable<UserCredential> {
        return fromPromise(signInWithPopup(this.auth, new GoogleAuthProvider()));
    }

    public signOutUser(): Observable<void> {
        return fromPromise(this.auth.signOut());
    }

    public onAuthStateChanged(): Observable<User | null> {
        return new Observable(this.auth.onAuthStateChanged.bind(this.auth));
    }
}
