import { UserModel } from './user.model';

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
