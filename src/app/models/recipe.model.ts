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

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface CategoryTag {
    id: string;
    key: string;
    name: string;
}
