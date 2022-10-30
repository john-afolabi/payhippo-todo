import { prismaMock } from '../../../../prisma/singleton';
import ListService from './lists.service';
import type { List } from '../../../types';

const list = {
  name: 'test list',
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => {});

describe('List Service Test', () => {
  test('should create new list ', () => {
    prismaMock.list.create.mockResolvedValue(list);
    expect(new ListService().createList(list)).resolves.toMatchObject<List>;
  });

  test('should get list', () => {
    prismaMock.list.findUnique.mockResolvedValue(list);
    expect(new ListService(list.id).getList()).resolves.toMatchObject<List>;
  });

  test('should get all lists with items', () => {
    prismaMock.list.findMany.mockResolvedValue([list]);
    expect(new ListService().getAllListsWithItems()).resolves.toMatchObject<
      List[]
    >;
  });

  test('should update existing list ', () => {
    prismaMock.list.update.mockResolvedValue(list);
    expect(new ListService(list.id).updateList(list)).resolves
      .toMatchObject<List>;
  });

  test('should delete existing list ', () => {
    prismaMock.list.delete.mockResolvedValue(list);
    expect(new ListService(list.id).deleteList()).resolves.toBeTruthy();
  });
});
