import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { ImageUploadRequest } from '../../../models/image.model';

@Injectable({
    providedIn: 'root',
})
export class ImageBackendService {
    constructor(private storage: Storage) {}

    public uploadImages(request: ImageUploadRequest): Observable<string[]> {
        const { files, folder } = request;
        const imagesPromises = Array.from(files, (image) => this.uploadImage(image, folder));

        return fromPromise(Promise.all(imagesPromises));
    }

    private async uploadImage(file: File, folder: string): Promise<string> {
        const randomId = Math.random().toString(36).substring(2);
        const storageRef = ref(this.storage, `${folder}/${randomId}-${file?.name}`);
        await uploadBytesResumable(storageRef, file as Blob);

        return await getDownloadURL(storageRef);
    }
}
