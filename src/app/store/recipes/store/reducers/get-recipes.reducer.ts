import { createReducer, on } from '@ngrx/store';
import * as RecipesActions from '../actions/index';
import { Nullable, StateSlice } from '../../../../models/utils.model';
import { RecipeObject } from '../../../../models/recipe.model';

export type GetRecipesState = StateSlice<Nullable<RecipeObject[]>>;

const initialState: GetRecipesState = {
    data: null,
    loading: false,
    loaded: false,
    error: null,
};

export const getRecipesReducer = createReducer(
    initialState,
    on(
        RecipesActions.getRecipes,
        (state, action): GetRecipesState => ({
            ...state,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        RecipesActions.getRecipesSuccess,
        (state, action): GetRecipesState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        RecipesActions.getRecipesFail,
        (state, action): GetRecipesState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
