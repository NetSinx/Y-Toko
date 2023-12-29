import { IOrderService } from "../interfaces/Service";
import { Order } from "../models/Order";
import { OrderRepository } from "../repositories/Order";

export class OrderService implements IOrderService {
  orderRepo: OrderRepository;

  constructor() {
    this.orderRepo = new OrderRepository;
  }

  async listOrders(): Promise<Order[]> {
    const listOrders: Order[] = await this.orderRepo.listOrders();

    return listOrders;
  }
  
  async addOrder(order: Order): Promise<Order> {
    const addOrder: Order = await this.orderRepo.addOrder(order);

    return addOrder;
  }
  
  async updateOrder(id: number, order: Order): Promise<Order | null> {
    const findOrder: Order | null = await this.orderRepo.getOrder(id);

    if (!findOrder) {
      return findOrder;
    }

    const updOrder: Order = await this.orderRepo.updateOrder(id, order);
    const result: Order = {
      id: id,
      nama: updOrder.nama,
      gambar: updOrder.gambar,
      kategori: updOrder.kategori,
      kuantitas: updOrder.kuantitas,
      total_harga: updOrder.total_harga,
      user: updOrder.user
    }

    return result;
  }
  
  async deleteOrder(id: number): Promise<number> {
    const findOrder: Order | null = await this.orderRepo.getOrder(id);

    if (!findOrder) {
      return 0;
    }

    const delOrder: number = await this.orderRepo.deleteOrder(id);

    return delOrder;
  }
  
  async getOrder(id: number): Promise<Order | null> {
    const getOrder: Order | null = await this.orderRepo.getOrder(id);

    return getOrder;
  }
}