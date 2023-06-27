import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { User, UserCredential } from '@firebase/auth';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { FirestoreActionsService } from '../../../services/firestore-actions/firestore-actions.service';
import { Collections } from '../../../models/collections.enum';
import { UserModel } from '../../../models/user.model';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class AuthBackendService {
    private auth: Auth = inject(Auth);

    constructor(private firestoreActions: FirestoreActionsService) {}

    public signInUser(): Observable<UserCredential> {
        return fromPromise(signInWithPopup(this.auth, new GoogleAuthProvider()));
    }

    public signOutUser(): Observable<void> {
        return fromPromise(this.auth.signOut());
    }

    public onAuthStateChanged(): Observable<User | null> {
        return new Observable(this.auth.onAuthStateChanged.bind(this.auth));
    }

    public saveUser(user: UserModel): Observable<void> {
        return this.firestoreActions.addDocWithRef<UserModel>(Collections.users, user.uid, user);
    }

    public deleteUser(): Observable<void> {
        return fromPromise((this.auth.currentUser as User)?.delete());
    }

    public getUser(uid: string): Observable<DocumentSnapshot<UserModel>> {
        return this.firestoreActions.getDocByRef<UserModel>(Collections.users, uid);
    }
}
