import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        // private productSearchFacade: ProductSearchFacade,
        // private productSearchBackend: ProductSearchBackend,
        private store: Store
    ) {}
}
