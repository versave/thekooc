import { UserModel } from './user.model';
import { ImageProperties } from './image.model';

export interface RecipeCard {
    id: string;
    image?: string;
    title: string;
    description: string;
    url: string;
    tags: string[];
    cookingTime: string;
    serves: number;
    author: UserModel;
}

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

export interface NewRecipeRequest extends Omit<NewRecipeArgs, 'images'> {
    images: string[];
}

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface CategoryTag {
    key: string;
    name: string;
}
