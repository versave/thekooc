import { Route } from '@angular/router';

export interface RouteData {
    routeTitle?: string;
    routeDescription?: string;
    useShell?: boolean;
}

export type RoutesWithData = Array<Omit<Route, 'data'> & { data?: RouteData }>;
