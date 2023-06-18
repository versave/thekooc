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
        path: 'account',
        loadComponent: () => import('./pages/account/account.component').then((mod) => mod.AccountComponent),
        data: {
            routeTitle: 'My account',
            routeDescription: 'The Kooc description.',
        },
        // todo: auth guard
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
    {
        path: 'recipes/new',
        loadComponent: () =>
            import('./pages/recipes/new-recipe/new-recipe.component').then((mod) => mod.NewRecipeComponent),
        data: {
            routeTitle: 'New recipe',
            routeDescription: 'The Kooc description.',
        },
        // todo: auth guard
        canActivate: [genericRouteGuard],
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
];
