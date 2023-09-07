import { createReducer, on } from '@ngrx/store';
import * as RecipeActions from '../actions/index';
import { Nullable, RequestStateSlice } from '../../../../models/utils.model';
import { RecipeObject } from '../../../../models/recipe.model';

export type GetRecipeState = RequestStateSlice<Nullable<RecipeObject>, Nullable<string>>;

const initialState: GetRecipeState = {
    data: null,
    requestArgs: null,
    loading: false,
    loaded: false,
    error: null,
};

export const getRecipeReducer = createReducer(
    initialState,
    on(
        RecipeActions.getRecipe,
        (state, action): GetRecipeState => ({
            ...initialState,
            requestArgs: action.payload,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        RecipeActions.getRecipeSuccess,
        (state, action): GetRecipeState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        RecipeActions.getRecipeFail,
        (state, action): GetRecipeState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    ),
    on(
        RecipeActions.resetRecipe,
        (state, action): GetRecipeState => ({
            ...initialState,
        })
    )
);
