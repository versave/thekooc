import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';
import { RecipeObject, UpdateRecipePayload } from '../../../../models/recipe.model';

export const updateRecipe = createAction('[Recipe] Update Recipe', props<{ payload: UpdateRecipePayload }>());
export const updateRecipeSuccess = createAction('[Recipe] Update Recipe Success', props<{ payload: RecipeObject }>());
export const updateRecipeFail = createAction('[Recipe] Update Recipe Fail', props<{ payload: StoreError }>());

export type UpdateRecipeActions = typeof updateRecipe | typeof updateRecipeSuccess | typeof updateRecipeFail;
