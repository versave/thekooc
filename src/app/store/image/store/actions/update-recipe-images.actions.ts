import { createAction, props } from '@ngrx/store';
import { UpdateImageUploadRequest } from '../../../../models/image.model';
import { StoreError } from '../../../../models/utils.model';

export const updateRecipeImages = createAction(
    '[Image] Update Recipe Images',
    props<{ payload: UpdateImageUploadRequest }>()
);
export const updateRecipeImagesSuccess = createAction(
    '[Image] Update Recipe Images Success',
    props<{ payload: string[] }>()
);
export const updateRecipeImagesFail = createAction(
    '[Image] Update Recipe Images Fail',
    props<{ payload: StoreError }>()
);

export type UpdateRecipeImagesActions =
    | typeof updateRecipeImages
    | typeof updateRecipeImagesSuccess
    | typeof updateRecipeImagesFail;
