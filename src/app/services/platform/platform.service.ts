import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class PlatformService {
    constructor(
        // eslint-disable-next-line @typescript-eslint/ban-types
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    public isBrowserPipe<T>(): MonoTypeOperatorFunction<T> {
        return filter(() => isPlatformBrowser(this.platformId));
    }

    public isBrowserOperator<T>(): Observable<T> {
        return of({} as T).pipe(this.isBrowserPipe());
    }

    public isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    public isServer(): boolean {
        return isPlatformServer(this.platformId);
    }
}
