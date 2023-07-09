import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as imageActions from '../actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ImageBackendService } from '../../services/image.backend.service';

@Injectable()
export class ImageEffects {
    private addRecipeImages$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(imageActions.addRecipeImages),
                switchMap((action) =>
                    this.imageBackendService.uploadImages(action.payload).pipe(
                        map((imageUrls) => imageActions.addRecipeImagesSuccess({ payload: imageUrls })),
                        catchError((error) =>
                            of(
                                imageActions.addRecipeImagesFail({
                                    payload: { error, message: 'Failed uploading images' },
                                })
                            )
                        )
                    )
                )
            )
    );

    private updateRecipeImages$ = createEffect(
        (): Actions =>
            this.actions$.pipe(
                ofType(imageActions.updateRecipeImages),
                switchMap((action) =>
                    this.imageBackendService
                        .uploadImages({
                            files: action.payload.uploadableImages,
                            folder: action.payload.folder,
                        })
                        .pipe(
                            map((uploadedImageUrls) => {
                                const combinedImageUrls = [...action.payload.originalImages, ...uploadedImageUrls];
                                return imageActions.updateRecipeImagesSuccess({ payload: combinedImageUrls });
                            }),
                            catchError((error) =>
                                of(
                                    imageActions.updateRecipeImagesFail({
                                        payload: {
                                            error,
                                            message: 'Failed uploading update recipe images',
                                        },
                                    })
                                )
                            )
                        )
                )
            )
    );

    constructor(private actions$: Actions, private store: Store, private imageBackendService: ImageBackendService) {}
}
