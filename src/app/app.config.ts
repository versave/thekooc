import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
        importProvidersFrom(provideFirestore(() => getFirestore())),
        importProvidersFrom(provideAuth(() => getAuth())),
    ],
};
