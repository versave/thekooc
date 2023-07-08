import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as recipeActions from '../../../recipe/store/actions';
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

    constructor(private actions$: Actions, private store: Store, private imageBackendService: ImageBackendService) {}
}
