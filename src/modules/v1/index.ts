import items from './items/items.routes';
import lists from './lists/lists.routes';
import { Router } from 'express';

const router = Router();

router.use('/lists', lists);
router.use('/items', items);

export default router;
