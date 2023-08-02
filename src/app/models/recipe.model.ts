import { UserModel } from './user.model';
import { ImageControl, ImageProperties } from './image.model';

export interface FullRecipe {
    id: string;
    images?: ImageProperties[];
    title: string;
    steps: string[];
    ingredients: Ingredient[];
    url: string;
    categories: CategoryTag[];
    tags: CategoryTag[];
    cookingTime: string;
    serves: number;
    author: UserModel;
}

export interface NewRecipeArgs {
    images: File[];
    title: string;
    private: boolean;
    steps: string[];
    ingredients: string[];
    categories: CategoryTag[];
    tags: CategoryTag[];
    cookingTime: number;
    serves: number;
    author: UserModel;
}

export interface UpdateRecipeArgs extends Omit<NewRecipeArgs, 'images'> {
    images: ImageControl[];
}

export interface RecipeData extends Omit<NewRecipeArgs, 'images'> {
    images: string[];
}

export interface RecipeObject extends RecipeData {
    id: string;
}

export interface UpdateRecipePayload {
    recipeId: string;
    recipe: UpdateRecipeArgs;
}

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface CategoryTag {
    key: string;
    name: string;
}
