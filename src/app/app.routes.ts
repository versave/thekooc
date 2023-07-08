import { Route } from '@angular/router';
import { genericRouteGuard } from './guards/generic-route.guard';
import { authRouteGuard } from './guards/auth-route.guard';
import { getUserRouteGuard } from './guards/get-user-route.guard';

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
        path: 'user',
        loadComponent: () => import('./pages/account/account.component').then((mod) => mod.AccountComponent),
        data: {
            routeTitle: 'My account',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard, authRouteGuard],
    },
    {
        path: 'user/:uid',
        loadComponent: () => import('./pages/account/account.component').then((mod) => mod.AccountComponent),
        data: {
            routeTitle: 'My account',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard, getUserRouteGuard],
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
    {
        path: 'recipes/new',
        loadComponent: () =>
            import('./pages/recipes/recipe-editor/recipe-editor.component').then((mod) => mod.RecipeEditorComponent),
        data: {
            routeTitle: 'New recipe',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard, authRouteGuard],
    },
    {
        path: 'recipes/edit/:id',
        loadComponent: () =>
            import('./pages/recipes/recipe-editor/recipe-editor.component').then((mod) => mod.RecipeEditorComponent),
        data: {
            routeTitle: 'Edit recipe',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard, authRouteGuard],
    },
    {
        path: 'recipes/:slug',
        loadComponent: () => import('./pages/recipes/recipe/recipe.component').then((mod) => mod.RecipeComponent),
        data: {
            routeTitle: 'Recipe name',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard],
    },
    {
        path: '404',
        loadComponent: () => import('./pages/not-found/not-found.component').then((mod) => mod.NotFoundComponent),
        data: {
            routeTitle: '404 Not found',
            routeDescription: 'The Kooc description.',
        },
        canActivate: [genericRouteGuard],
    },
    {
        path: '**',
        redirectTo: '404',
    },
];
