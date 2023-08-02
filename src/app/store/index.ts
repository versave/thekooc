import { authReducers } from './auth/store/reducers';
import { singleRecipeReducers } from './single-recipe/store/reducers';
import { singleRecipeEffects } from './single-recipe/store/effects';
import { authEffects } from './auth/store/effects';
import { imageReducers } from './image/store/reducers';
import { imageEffects } from './image/store/effects';
import { recipesReducers } from './recipes/store/reducers';
import { recipesEffects } from './recipes/store/effects';

export const storeReducers = {
    auth: authReducers,
    singleRecipe: singleRecipeReducers,
    image: imageReducers,
    recipes: recipesReducers,
};

export const storeEffects = [...authEffects, ...singleRecipeEffects, ...imageEffects, ...recipesEffects];
