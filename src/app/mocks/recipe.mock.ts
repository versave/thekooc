import { RecipeCard } from '../models/recipe.model';

export const recipeMock: RecipeCard = {
    image: 'https://images.unsplash.com/photo-1564436872-f6d81182df12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    title: 'Mushroom and cream cheese pizza with extra sauce',
    description:
        'Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet',
    tags: ['Beef', 'Egg', 'Spices'],
    cookingTime: '1hr 15m',
    serves: 4,
    url: 'https://www.google.com',
    author: {
        name: 'John Travolta',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=207&q=80',
        url: 'https://www.google.com',
    },
};

export const recipeMockUnfull: RecipeCard = {
    title: 'Mushroom and cream cheese pizza with extra sauce',
    description:
        'Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet',
    tags: ['Beef', 'Egg', 'Spices'],
    cookingTime: '1hr 15m',
    serves: 4,
    url: 'https://www.google.com',
    author: {
        name: 'John Travolta',
        url: 'https://www.google.com',
    },
};
