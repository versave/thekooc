import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { MetaHandlerService } from '../services/meta-handler/meta-handler.service';
import { inject } from '@angular/core';

export const genericRouteGuard: CanActivateFn = (snapshot: ActivatedRouteSnapshot) => {
    const metaHandlerService: MetaHandlerService = inject(MetaHandlerService);

    metaHandlerService.setPageMeta(snapshot.data);

    return true;
};
