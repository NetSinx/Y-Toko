import { DataSource } from "typeorm";
import { IOrderRepository } from "../interfaces/Repository";
import { Order } from "../models/Order";
import { Config } from "../config/DataSource";

export class OrderRepository implements IOrderRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }

  async listOrders(): Promise<Order[]> {
    const orderRepo = (await this.db).getRepository(Order);
    const listOrders: Order[] = await orderRepo.createQueryBuilder().select().getMany();

    return listOrders;
  }

  async addOrder(order: Order): Promise<Order> {
    const orderRepo = (await this.db).getRepository(Order);
    await orderRepo.createQueryBuilder().insert().values(order).execute();

    return order;
  }

  async updateOrder(id: number, order: Order): Promise<Order> {
    const orderRepo = (await this.db).getRepository(Order);
    await orderRepo.createQueryBuilder().update().where("id = :id", {id: id}).set(order).execute();

    return order;
  }

  async deleteOrder(id: number): Promise<number> {
    const orderRepo = (await this.db).getRepository(Order);
    const delOrder = await orderRepo.createQueryBuilder().delete().where("id = :id", {id: id}).execute();

    return delOrder.affected!;
  }

  async getOrder(id: number): Promise<Order | null> {
    const orderRepo = (await this.db).getRepository(Order);
    const getOrder: Order | null = await orderRepo.createQueryBuilder().select().where("id = :id", {id: id}).getOne();

    return getOrder;
  }
}