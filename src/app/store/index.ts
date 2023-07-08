import { authReducers } from './auth/store/reducers';
import { recipeReducers } from './recipe/store/reducers';
import { recipeEffects } from './recipe/store/effects';
import { authEffects } from './auth/store/effects';
import { imageReducers } from './image/store/reducers';
import { imageEffects } from './image/store/effects';

export const storeReducers = {
    auth: authReducers,
    recipe: recipeReducers,
    image: imageReducers,
};

export const storeEffects = [...authEffects, ...recipeEffects, ...imageEffects];
