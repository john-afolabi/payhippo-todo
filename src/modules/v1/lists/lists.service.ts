import prisma from '../../../../prisma/client';
import { Prisma } from '@prisma/client';

const returningData = Prisma.validator<Prisma.ListSelect>()({
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
});

export default class ListService {
  private id: string;

  private model = prisma.list;

  constructor(id: string = '') {
    this.id = id;
  }

  public async createList(params: Prisma.ListCreateInput) {
    const list = await this.model.create({
      data: params,
      select: { ...returningData },
    });

    return list;
  }

  public async getList() {
    const list = await this.model.findUnique({
      where: { id: this.id },
      select: { ...returningData },
    });

    return list;
  }

  public async getAllListsWithItems() {
    const lists = await this.model.findMany({
      select: { ...returningData, items: true },
    });

    return lists;
  }

  public async getListWithItems() {
    const listWithItems = await this.model.findFirstOrThrow({
      where: { id: this.id },
      select: { ...returningData, items: true },
    });

    return listWithItems;
  }

  public async updateList(params: Prisma.ListUpdateInput) {
    const list = await this.model.update({
      data: params,
      where: { id: this.id },
      select: { ...returningData },
    });

    return list;
  }

  public async deleteList() {
    await this.model.delete({
      where: { id: this.id },
    });

    return true;
  }
}
