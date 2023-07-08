import { PlatformService } from '../../../services/platform/platform.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addImages } from '../store/actions';
import { ImageUploadRequest } from '../../../models/image.model';

@Injectable({
    providedIn: 'root',
})
export class ImageFacade {
    constructor(private store: Store, private platformService: PlatformService) {}

    public addImages(request: ImageUploadRequest): void {
        if (this.platformService.isBrowser()) {
            this.store.dispatch(addImages({ payload: request }));
        }
    }
}
