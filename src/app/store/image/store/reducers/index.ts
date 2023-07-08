import { ActionReducer, combineReducers } from '@ngrx/store';
import { addRecipeImagesReducer, AddRecipeImagesState } from './add-image.reducer';

export interface ImageReducerState {
    addRecipeImages: AddRecipeImagesState;
}

export const imageReducers: ActionReducer<ImageReducerState, any> = combineReducers({
    addRecipeImages: addRecipeImagesReducer,
});
