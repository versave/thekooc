import { FullRecipe, RecipeCard } from '../models/recipe.model';
import { UserModel } from '../models/user.model';

export const recipeMock: RecipeCard = {
    id: '1',
    image: 'https://images.unsplash.com/photo-1564436872-f6d81182df12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    title: 'Full Mushroom and cream cheese pizza with extra sauce',
    description:
        'Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet',
    tags: ['Beef', 'Egg', 'Spices'],
    cookingTime: '1hr 15m',
    serves: 4,
    url: 'https://www.google.com',
    author: {
        uid: '1',
        displayName: 'John Travolta',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=207&q=80',
    },
};

export const recipeMockUnfull: RecipeCard = {
    id: '2',
    title: 'Unfull Mushroom and cream cheese pizza with extra sauce',
    description:
        'Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet',
    tags: ['Beef', 'Egg', 'Spices'],
    cookingTime: '1hr 15m',
    serves: 4,
    url: 'https://www.google.com',
    author: {
        uid: '1',
        displayName: 'John Travolta',
    },
};

export const getRecipeMocks = (): RecipeCard[] => {
    const recipeMocks: RecipeCard[] = [];

    for (let idx = 0; idx < 8; idx++) {
        recipeMocks.push(idx % 2 === 0 ? recipeMock : recipeMockUnfull);
    }

    return recipeMocks;
};

export const recipePageDataMock: FullRecipe = {
    id: '1',
    images: [
        {
            path: 'https://images.unsplash.com/photo-1564436872-f6d81182df12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
            hasRetina: false,
            alt: 'Full Mushroom and cream cheese pizza with extra sauce',
        },
        {
            path: 'https://images.unsplash.com/photo-1564436872-f6d81182df12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
            hasRetina: false,
            alt: 'Full Mushroom and cream cheese pizza with extra sauce',
        },
        {
            path: 'https://images.unsplash.com/photo-1564436872-f6d81182df12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
            hasRetina: false,
            alt: 'Full Mushroom and cream cheese pizza with extra sauce',
        },
        {
            path: 'https://images.unsplash.com/photo-1564436872-f6d81182df12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
            hasRetina: false,
            alt: 'Full Mushroom and cream cheese pizza with extra sauce',
        },
        {
            path: 'https://images.unsplash.com/photo-1564436872-f6d81182df12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
            hasRetina: false,
            alt: 'Full Mushroom and cream cheese pizza with extra sauce',
        },
    ],
    title: 'Full Mushroom and cream cheese pizza with extra sauce',
    steps: [
        'Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet',
        'Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet',
        'Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem ipsum sit dolor amet Lorem amet',
    ],
    categories: [
        { key: 'pastry', name: 'Pastry' },
        { key: 'main-dish', name: 'Main Course' },
    ],
    ingredients: [
        { name: 'Beef', quantity: '1kg' },
        { name: 'Eggs', quantity: '2' },
        { name: 'Spices', quantity: '50 grams' },
        { name: 'Beef', quantity: '1kg' },
        { name: 'Cucumbers', quantity: '2' },
        { name: 'Spices', quantity: '50 grams' },
    ],
    tags: [
        { key: 'pastry', name: 'Pastry' },
        { key: 'heavy', name: 'Heavy' },
        { key: 'spicy', name: 'Spicy' },
    ],
    cookingTime: '1hr 15m',
    serves: 4,
    url: 'https://www.google.com',
    author: {
        uid: '1',
        displayName: 'John Travolta',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=207&q=80',
    },
};
