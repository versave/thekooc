import { createAction, props } from '@ngrx/store';
import { ImageUploadRequest } from '../../../../models/image.model';
import { StoreError } from '../../../../models/utils.model';

export const addRecipeImages = createAction('[Image] Add Recipe Images', props<{ payload: ImageUploadRequest }>());
export const addRecipeImagesSuccess = createAction('[Image] Add Recipe Images Success', props<{ payload: string[] }>());
export const addRecipeImagesFail = createAction('[Image] Add Recipe Images Fail', props<{ payload: StoreError }>());

export type AddRecipeImagesActions =
    | typeof addRecipeImages
    | typeof addRecipeImagesSuccess
    | typeof addRecipeImagesFail;
