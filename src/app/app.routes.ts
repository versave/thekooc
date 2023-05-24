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
];
