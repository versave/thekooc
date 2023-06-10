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
    { id: '1', key: 'main-dish', name: 'Main dish' },
    { id: '2', key: 'soup', name: 'Soup' },
    { id: '3', key: 'pastry', name: 'Pastry' },
    { id: '4', key: 'dessert', name: 'Dessert' },
    { id: '5', key: 'drinks', name: 'Drinks' },
    { id: '6', key: 'other', name: 'Other' },
];

export const tags: CategoryTag[] = [
    { id: '1', key: 'pastry', name: 'Pastry' },
    { id: '2', key: 'heavy', name: 'Heavy' },
    { id: '3', key: 'spicy', name: 'Spicy' },
    { id: '1', key: 'pastry', name: 'Pastry' },
    { id: '2', key: 'heavy', name: 'Heavy' },
    { id: '3', key: 'spicy', name: 'Spicy' },
    { id: '1', key: 'pastry', name: 'Pastry' },
    { id: '2', key: 'heavy', name: 'Heavy' },
    { id: '3', key: 'spicy', name: 'Spicy' },
    { id: '1', key: 'pastry', name: 'Pastry' },
    { id: '2', key: 'heavy', name: 'Heavy' },
    { id: '3', key: 'spicy', name: 'Spicy' },
    { id: '1', key: 'pastry', name: 'Pastry' },
    { id: '2', key: 'heavy', name: 'Heavy' },
    { id: '3', key: 'spicy', name: 'Spicy' },
    { id: '1', key: 'pastry', name: 'Pastry' },
    { id: '2', key: 'heavy', name: 'Heavy' },
    { id: '3', key: 'spicy', name: 'Spicy' },
];
