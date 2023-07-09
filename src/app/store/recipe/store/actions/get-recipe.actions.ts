import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';
import { RecipeData } from '../../../../models/recipe.model';

export const getRecipe = createAction('[Recipe] Get Recipe', props<{ payload: string }>());
export const getRecipeSuccess = createAction('[Recipe] Get Recipe Success', props<{ payload: RecipeData }>());
export const getRecipeFail = createAction('[Recipe] Get Recipe Fail', props<{ payload: StoreError }>());

export type GetRecipeActions = typeof getRecipe | typeof getRecipeSuccess | typeof getRecipeFail;
