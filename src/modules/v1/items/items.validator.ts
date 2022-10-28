import { body } from 'express-validator';

export const createItem = () => [body('description').isString()];

export const updateItem = () => [
  body('description').isString(),
  body('isCompleted').isBoolean(),
];
