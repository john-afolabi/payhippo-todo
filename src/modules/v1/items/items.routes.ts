import { NextFunction, Response, Router } from 'express';

import Items from './items.service';
import { AuthenticatedRequest } from '../../../types';
import { createError, success, validate } from '../../common/utils';

import { createItem, updateItem } from './items.validator';

const router = Router();

router.post(
  '/',
  createItem(),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        body: { description },
        query: { listId },
      } = req;

      const item = await new Items('', listId as string).createItemInList({
        description,
        isCompleted: false,
      });

      return res.status(201).json(success('Item created successfully', item));
    } catch (e) {
      return next(e);
    }
  },
);

router.get(
  '/',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        query: { listId },
      } = req;

      const items = await new Items('', listId as string).getItemsInList();

      return res
        .status(200)
        .json(success('List items retrieved successfully', items));
    } catch (e) {
      return next(e);
    }
  },
);

router.get(
  '/:id',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        params: { id },
      } = req;

      const item = await new Items(id, '').getItem();

      return res.status(200).json(success('Item retrieved successfully', item));
    } catch (e) {
      return next(e);
    }
  },
);

router.get(
  '/:id/copy',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        params: { id },
      } = req;

      const item = await new Items(id, '').getItemWithLists();

      if (!item) {
        throw createError('Item not found', 404);
      }

      const copy = await new Items().createItemInLists({
        description: item.description,
        isCompleted: item.isCompleted,
        listIds: item.lists.map((list) => list.id),
      });

      return res.status(200).json(success('Item copied successfully', copy));
    } catch (e) {
      return next(e);
    }
  },
);

router.put(
  '/:id',
  updateItem(),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        body: { description, isCompleted },
        params: { id },
      } = req;

      const item = await new Items(id, '').updateItem({
        description,
        isCompleted,
      });

      return res.status(200).json(success('Item updated successfully', item));
    } catch (e) {
      return next(e);
    }
  },
);

router.delete(
  '/:id',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        params: { id },
      } = req;

      const deleted = await new Items(id, '').deleteItem().catch((e) => {
        throw e;
      });

      if (!deleted) {
        throw createError('Could not delete item', 400);
      }

      return res.status(200).json(success('Item deleted successfully', true));
    } catch (e) {
      return next(e);
    }
  },
);

export default router;
