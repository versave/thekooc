import { createReducer, on } from '@ngrx/store';
import * as RecipeActions from '../actions/index';
import { Nullable, RequestStateSlice } from '../../../../models/utils.model';

export type DeleteRecipeState = RequestStateSlice<Nullable<string>, Nullable<string>>;

const initialState: DeleteRecipeState = {
    data: null,
    requestArgs: null,
    loading: false,
    loaded: false,
    error: null,
};

export const deleteRecipeReducer = createReducer(
    initialState,
    on(
        RecipeActions.deleteRecipe,
        (state, action): DeleteRecipeState => ({
            ...initialState,
            requestArgs: action.payload,
            loading: true,
            loaded: false,
            error: null,
        })
    ),
    on(
        RecipeActions.deleteRecipeSuccess,
        (state, action): DeleteRecipeState => ({
            ...state,
            data: action.payload,
            loading: false,
            loaded: true,
            error: null,
        })
    ),
    on(
        RecipeActions.deleteRecipeFail,
        (state, action): DeleteRecipeState => ({
            ...state,
            loading: false,
            loaded: false,
            error: action.payload,
        })
    )
);
