import { createReducer, on } from '@ngrx/store';
import * as RecipeActions from '../actions/index';
import { Nullable, RequestStateSlice } from '../../../../models/utils.model';
import { RecipeObject, UpdateRecipePayload } from '../../../../models/recipe.model';

export type UpdateRecipeState = RequestStateSlice<Nullable<RecipeObject>, Nullable<UpdateRecipePayload>>;

const initialState: UpdateRecipeState = {
    data: null,
    requestArgs: null,
    loading: false,
    loaded: false,
    error: null,
};

export const updateRecipeReducer = createReducer(
    initialState,
    on(
        RecipeActions.updateRecipe,
        (state, action): UpdateRecipeState => ({
            ...initialState,
            requestArgs: action.payload,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        RecipeActions.updateRecipeSuccess,
        (state, action): UpdateRecipeState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        RecipeActions.updateRecipeFail,
        (state, action): UpdateRecipeState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
