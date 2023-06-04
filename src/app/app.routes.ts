import { Route } from '@angular/router';
import { genericRouteGuard } from './guards/generic-route.guard';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((mod) => mod.HomeComponent),
        data: {
            routeTitle: 'All of your recipes in one place',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard],
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then((mod) => mod.RegisterComponent),
        data: {
            routeTitle: 'Register',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard],
    },
    {
        path: 'account',
        loadComponent: () => import('./pages/account/account.component').then((mod) => mod.AccountComponent),
        data: {
            routeTitle: 'My account',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard],
    },
    {
        path: 'recipes',
        loadComponent: () => import('./pages/recipes/recipes.component').then((mod) => mod.RecipesComponent),
        data: {
            routeTitle: 'Recipes',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard],
    },
];
