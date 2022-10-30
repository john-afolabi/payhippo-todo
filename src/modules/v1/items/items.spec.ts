import { prismaMock } from '../../../../prisma/singleton';
import ItemService from './items.service';
import type { Item } from '../../../types';

const item = {
  id: '1',
  description: 'test item',
  isCompleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => {});

describe('Item Service Test', () => {
  test('should create new item ', async () => {
    prismaMock.item.create.mockResolvedValue(item);
    expect(new ItemService('', '1').createItemInList(item)).resolves
      .toMatchObject<Item>;
  });

  test('should get item', () => {
    prismaMock.item.findUnique.mockResolvedValue(item);
    expect(new ItemService(item.id).getItem()).resolves.toMatchObject<Item>;
  });

  test('should get all items', () => {
    prismaMock.item.findMany.mockResolvedValue([item]);
    expect(new ItemService().getAllItems()).resolves.toMatchObject<Item>;
  });

  test('should get items in list', () => {
    prismaMock.item.findMany.mockResolvedValue([item]);
    expect(new ItemService('', '1').getItemsInList()).resolves.toMatchObject<
      Item[]
    >;
  });

  test('should update existing item', () => {
    prismaMock.item.update.mockResolvedValue(item);
    expect(new ItemService(item.id).updateItem(item)).resolves
      .toMatchObject<Item>;
  });

  test('should delete existing item', () => {
    prismaMock.item.delete.mockResolvedValue(item);
    expect(new ItemService(item.id).deleteItem()).resolves.toBeTruthy();
  });
});
