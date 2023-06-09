import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';
import { RecipeObject } from '../../../../models/recipe.model';

export const getRecipe = createAction('[Recipe] Get Recipe', props<{ payload: string }>());
export const getRecipeSuccess = createAction('[Recipe] Get Recipe Success', props<{ payload: RecipeObject }>());
export const getRecipeFail = createAction('[Recipe] Get Recipe Fail', props<{ payload: StoreError }>());

export type GetRecipeActions = typeof getRecipe | typeof getRecipeSuccess | typeof getRecipeFail;
