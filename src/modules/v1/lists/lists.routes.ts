import { NextFunction, Response, Router } from 'express';

import Lists from './lists.service';
import { AuthenticatedRequest } from '../../../types';
import { createError, success, validate } from '../../common/utils';
import { createList, updateList } from './lists.validator';

const router = Router();

router.post(
  '/',
  createList(),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        body: { name },
      } = req;

      const list = await new Lists().createList({ name });
      return res.status(201).json(success('List created successfully', list));
    } catch (e) {
      return next(e);
    }
  },
);

router.get(
  '/',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const lists = await new Lists().getAllListsWithItems();
      return res
        .status(200)
        .json(success('List retrieved successfully', lists));
    } catch (e) {
      return next(e);
    }
  },
);

router.put(
  '/:id',
  updateList(),
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        body: { name },
        params: { id },
      } = req;

      const list = await new Lists(id).updateList({ name });
      return res.status(200).json(success('List updated successfully', list));
    } catch (e) {
      return next(e);
    }
  },
);

router.get(
  '/:id',
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        params: { id },
      } = req;

      const list = await new Lists(id).getList();
      return res.status(200).json(success('List retrieved successfully', list));
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

      const deleted = await new Lists(id).deleteList().catch((e) => {
        throw e;
      });

      if (!deleted) {
        throw createError('Could not delete item', 400);
      }

      return res.status(200).json(success('List deleted successfully', true));
    } catch (e) {
      return next(e);
    }
  },
);

router.get(
  '/:id/items',
  validate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const {
        params: { id },
      } = req;

      const listWithItems = await new Lists(id).getListWithItems();
      return res
        .status(200)
        .json(success('List with items retrieved successfully', listWithItems));
    } catch (e) {
      return next(e);
    }
  },
);

export default router;
