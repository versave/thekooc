import { AddRecipeEffects } from './add-recipe.effects';
import { GetRecipeEffects } from './get-recipe.effects';
import { UpdateRecipeEffects } from './update-recipe.effects';
import { DeleteRecipeEffects } from './delete-recipe.effects';

export const singleRecipeEffects = [GetRecipeEffects, AddRecipeEffects, UpdateRecipeEffects, DeleteRecipeEffects];

export * from './get-recipe.effects';
export * from './add-recipe.effects';
export * from './update-recipe.effects';
export * from './delete-recipe.effects';
