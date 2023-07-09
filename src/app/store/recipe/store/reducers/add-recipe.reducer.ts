import { createReducer, on } from '@ngrx/store';
import * as RecipeActions from '../actions/index';
import { Nullable, RequestStateSlice } from '../../../../models/utils.model';
import { NewRecipeArgs, RecipeData } from '../../../../models/recipe.model';

export type AddRecipeState = RequestStateSlice<Nullable<RecipeData>, Nullable<NewRecipeArgs>>;

const initialState: AddRecipeState = {
    data: null,
    requestArgs: null,
    loading: false,
    loaded: false,
    error: null,
};

export const addRecipeReducer = createReducer(
    initialState,
    on(
        RecipeActions.addRecipe,
        (state, action): AddRecipeState => ({
            ...initialState,
            requestArgs: action.payload,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        RecipeActions.addRecipeSuccess,
        (state, action): AddRecipeState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        RecipeActions.addRecipeFail,
        (state, action): AddRecipeState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
