export interface RecipeCard {
    image?: string;
    title: string;
    description: string;
    url: string;
    tags: string[];
    cookingTime: string;
    serves: number;
    author: RecipeCardAuthor;
}

interface RecipeCardAuthor {
    name: string;
    image?: string;
    url: string;
}
