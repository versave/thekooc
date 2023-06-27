import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';
import { NewRecipeRequest } from '../../../../models/recipe.model';

export const addRecipe = createAction('[Recipe] Add Recipe', props<{ payload: NewRecipeRequest }>());
export const addRecipeSuccess = createAction('[Recipe] Add Recipe Success', props<{ payload: NewRecipeRequest }>());
export const addRecipeFail = createAction('[Recipe] Add Recipe Fail', props<{ payload: StoreError }>());

export type AddRecipeActions = typeof addRecipe | typeof addRecipeSuccess | typeof addRecipeFail;
