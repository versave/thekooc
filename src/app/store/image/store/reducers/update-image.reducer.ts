import { createReducer, on } from '@ngrx/store';
import * as ImageActions from '../actions';
import { Nullable, RequestStateSlice } from '../../../../models/utils.model';

export type UpdateRecipeImagesState = RequestStateSlice<
    Nullable<string[]>,
    Nullable<{ files: string[]; originalImages: string[]; folder: string }>
>;

const initialState: UpdateRecipeImagesState = {
    data: null,
    requestArgs: null,
    loading: false,
    loaded: false,
    error: null,
};

export const updateRecipeImagesReducer = createReducer(
    initialState,
    on(
        ImageActions.updateRecipeImages,
        (state, action): UpdateRecipeImagesState => ({
            ...initialState,
            requestArgs: {
                files: action.payload.uploadableImages.map((file) => file.name),
                originalImages: action.payload.originalImages,
                folder: action.payload.folder,
            },
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        ImageActions.updateRecipeImagesSuccess,
        (state, action): UpdateRecipeImagesState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        ImageActions.updateRecipeImagesFail,
        (state, action): UpdateRecipeImagesState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
