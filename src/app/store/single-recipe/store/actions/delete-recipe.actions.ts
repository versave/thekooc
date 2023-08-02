import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';

export const deleteRecipe = createAction('[Single Recipe] Delete Recipe', props<{ payload: string }>());
export const deleteRecipeSuccess = createAction('[Single Recipe] Delete Recipe Success', props<{ payload: string }>());
export const deleteRecipeFail = createAction('[Single Recipe] Delete Recipe Fail', props<{ payload: StoreError }>());

export type DeleteRecipeActions = typeof deleteRecipe | typeof deleteRecipeSuccess | typeof deleteRecipeFail;
