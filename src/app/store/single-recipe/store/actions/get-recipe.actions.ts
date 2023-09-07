import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';
import { RecipeObject } from '../../../../models/recipe.model';

export const getRecipe = createAction('[Single Recipe] Get Recipe', props<{ payload: string }>());
export const getRecipeSuccess = createAction('[Single Recipe] Get Recipe Success', props<{ payload: RecipeObject }>());
export const getRecipeFail = createAction('[Single Recipe] Get Recipe Fail', props<{ payload: StoreError }>());
export const resetRecipe = createAction('[Single Recipe] Reset');

export type GetRecipeActions = typeof getRecipe | typeof getRecipeSuccess | typeof getRecipeFail | typeof resetRecipe;
