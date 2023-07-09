import { AddRecipeEffects } from './add-recipe.effects';
import { GetRecipeEffects } from './get-recipe.effects';
import { UpdateRecipeEffects } from './update-recipe.effects';

export const recipeEffects = [GetRecipeEffects, AddRecipeEffects, UpdateRecipeEffects];

export * from './get-recipe.effects';
export * from './add-recipe.effects';
export * from './update-recipe.effects';
