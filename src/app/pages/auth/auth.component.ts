import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, signInWithPopup, GoogleAuthProvider, setPersistence } from '@angular/fire/auth';

@Component({
    selector: 'tk-auth',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
    private auth: Auth = inject(Auth);

    public ngOnInit(): void {
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                console.log('signed in', user);
            } else {
                this.signIn();
            }
        });
    }

    public login(): void {
        this.signIn();
    }

    public signIn(): void {
        signInWithPopup(this.auth, new GoogleAuthProvider())
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...

                console.log('success', result);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...

                console.log('error', error);
            });
    }

    public logout(): void {
        this.auth
            .signOut()
            .then(() => {
                console.log('logout');
            })
            .catch((error) => {
                console.log('error', error);
            });
    }
}
