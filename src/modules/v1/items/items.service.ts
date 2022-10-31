import prisma from '../../../../prisma/client';
import { Prisma } from '@prisma/client';

const returningData = Prisma.validator<Prisma.ItemSelect>()({
  id: true,
  description: true,
  isCompleted: true,
  createdAt: true,
  updatedAt: true,
});

export default class ItemsService {
  private id: string;

  private listId: string;

  private model = prisma.item;

  constructor(id: string = '', listId: string = '') {
    this.id = id;
    this.listId = listId;
  }

  public async createItemInList(params: Prisma.ItemCreateInput) {
    const item = await this.model.create({
      data: {
        ...params,
        lists: {
          connect: { id: this.listId },
        },
      },
      select: { ...returningData },
    });

    return item;
  }

  public async createItemInLists(
    params: Prisma.ItemCreateInput & { listIds: string[] },
  ) {
    const { listIds, ...rest } = params;
    const item = await this.model.create({
      data: {
        ...rest,
        lists: {
          connect: listIds.map((id) => ({ id })),
        },
      },
    });

    return item;
  }

  public async getItem() {
    const item = await this.model
      .findUnique({
        where: { id: this.id },
      })
      .catch((e) => {
        throw e;
      });

    return item;
  }

  public async getAllItems() {
    const items = await this.model.findMany({
      select: { ...returningData },
    });

    return items;
  }

  public async getItemWithLists() {
    const items = await this.model.findUnique({
      where: { id: this.id },
      select: { ...returningData, lists: true },
    });

    return items;
  }

  public async getItemsInList() {
    const items = await this.model.findMany({
      where: { lists: { every: { id: this.listId } } },
    });

    return items;
  }

  public async updateItem(params: Prisma.ItemUpdateInput) {
    const item = await this.model.update({
      data: params,
      where: { id: this.id },
      select: { ...returningData },
    });

    return item;
  }

  public async deleteItem() {
    await this.model
      .delete({
        where: { id: this.id },
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });

    return true;
  }
}
