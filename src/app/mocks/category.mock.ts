import { CategoryCard } from '../models/category.model';
import { CategoryTag } from '../models/recipe.model';

export const categoryCards: CategoryCard[] = [
    {
        id: '1',
        title: 'Main dish',
        imageUrl: '/assets/icons/main-dish.svg',
        url: '/categories/dish',
    },
    {
        id: '2',
        title: 'Soup',
        imageUrl: '/assets/icons/soup.svg',
        url: '/categories/dish',
    },
    {
        id: '3',
        title: 'Pastry',
        imageUrl: '/assets/icons/pastry.svg',
        url: '/categories/dish',
    },
    {
        id: '4',
        title: 'Dessert',
        imageUrl: '/assets/icons/dessert.svg',
        url: '/categories/dish',
    },
    {
        id: '5',
        title: 'Drinks',
        imageUrl: '/assets/icons/drinks.svg',
        url: '/categories/dish',
    },
    {
        id: '6',
        title: 'Other',
        imageUrl: '/assets/icons/other-foods.svg',
        url: '/categories/dish',
    },
];

export const categories: CategoryTag[] = [
    { key: 'main-dish', name: 'Main dish' },
    { key: 'soup', name: 'Soup' },
    { key: 'pastry', name: 'Pastry' },
    { key: 'dessert', name: 'Dessert' },
    { key: 'drinks', name: 'Drinks' },
    { key: 'other', name: 'Other' },
];

export const tags: CategoryTag[] = [
    { key: 'pastry', name: 'Pastry' },
    { key: 'heavy', name: 'Heavy' },
    { key: 'spicy', name: 'Spicy' },
    { key: 'pastry', name: 'Pastry' },
    { key: 'heavy', name: 'Heavy' },
    { key: 'spicy', name: 'Spicy' },
    { key: 'pastry', name: 'Pastry' },
    { key: 'heavy', name: 'Heavy' },
    { key: 'spicy', name: 'Spicy' },
    { key: 'pastry', name: 'Pastry' },
    { key: 'heavy', name: 'Heavy' },
    { key: 'spicy', name: 'Spicy' },
    { key: 'pastry', name: 'Pastry' },
    { key: 'heavy', name: 'Heavy' },
    { key: 'spicy', name: 'Spicy' },
    { key: 'pastry', name: 'Pastry' },
    { key: 'heavy', name: 'Heavy' },
    { key: 'spicy', name: 'Spicy' },
];
