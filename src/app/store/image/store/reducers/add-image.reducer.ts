import { createReducer, on } from '@ngrx/store';
import * as ImageActions from '../actions';
import { Nullable, RequestStateSlice } from '../../../../models/utils.model';

export type AddRecipeImagesState = RequestStateSlice<Nullable<string[]>, Nullable<{ files: string[]; folder: string }>>;

const initialState: AddRecipeImagesState = {
    data: null,
    requestArgs: null,
    loading: false,
    loaded: false,
    error: null,
};

export const addRecipeImagesReducer = createReducer(
    initialState,
    on(
        ImageActions.addRecipeImages,
        (state, action): AddRecipeImagesState => ({
            ...initialState,
            requestArgs: {
                files: action.payload.files.map((file) => file.name),
                folder: action.payload.folder,
            },
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        ImageActions.addRecipeImagesSuccess,
        (state, action): AddRecipeImagesState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        ImageActions.addRecipeImagesFail,
        (state, action): AddRecipeImagesState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
