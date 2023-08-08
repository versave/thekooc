import { createAction, props } from '@ngrx/store';
import { StoreError } from '../../../../models/utils.model';
import { RecipeObject } from '../../../../models/recipe.model';
import { FilterRequest } from '../../../../models/filter.model';

export const getRecipes = createAction('[Recipes] Get Recipes', props<{ payload?: FilterRequest }>());
export const getUserRecipes = createAction(
    '[Recipes] Get User Recipes',
    props<{
        payload: { userUid: string | null; filters: FilterRequest };
    }>()
);
export const getRecipesSuccess = createAction('[Recipes] Get Recipes Success', props<{ payload: RecipeObject[] }>());
export const getRecipesFail = createAction('[Recipes] Get Recipes Fail', props<{ payload: StoreError }>());

export type GetRecipesActions = typeof getRecipes | typeof getRecipesSuccess | typeof getRecipesFail;
