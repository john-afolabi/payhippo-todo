import { body } from 'express-validator';

export const createList = () => [body('name').isString()];

export const updateList = () => [body('name').isString()];
