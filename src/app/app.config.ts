import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authEffects } from './store/auth/store/effects';
import { authReducers } from './store/auth/store/reducers';

export const appConfig: ApplicationConfig = {
    providers: [
        provideEffects(authEffects),
        provideStore({ auth: authReducers }),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75,
        }),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
        importProvidersFrom(provideFirestore(() => getFirestore())),
        importProvidersFrom(provideAuth(() => getAuth())),
    ],
};
