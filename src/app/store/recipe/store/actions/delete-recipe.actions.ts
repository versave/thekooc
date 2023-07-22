import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';

export const deleteRecipe = createAction('[Recipe] Delete Recipe', props<{ payload: string }>());
export const deleteRecipeSuccess = createAction('[Recipe] Delete Recipe Success', props<{ payload: string }>());
export const deleteRecipeFail = createAction('[Recipe] Delete Recipe Fail', props<{ payload: StoreError }>());

export type DeleteRecipeActions = typeof deleteRecipe | typeof deleteRecipeSuccess | typeof deleteRecipeFail;
