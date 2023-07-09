import { ActionReducer, combineReducers } from '@ngrx/store';
import { addRecipeImagesReducer, AddRecipeImagesState } from './add-image.reducer';
import { updateRecipeImagesReducer, UpdateRecipeImagesState } from './update-image.reducer';

export interface ImageReducerState {
    addRecipeImages: AddRecipeImagesState;
    updateRecipeImages: UpdateRecipeImagesState;
}

export const imageReducers: ActionReducer<ImageReducerState, any> = combineReducers({
    addRecipeImages: addRecipeImagesReducer,
    updateRecipeImages: updateRecipeImagesReducer,
});
