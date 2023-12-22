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
    throw new Error("Method not implemented.");
  }

  async updateOrder(id: number, order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  async deleteOrder(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async getOrder(id: number): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
}