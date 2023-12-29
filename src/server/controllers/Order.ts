import { Request, Response } from "express";
import { IOrderController } from "../interfaces/Controller";
import { OrderService } from "../services/Order";
import { Order } from "../models/Order";
import { ResponseClient } from "../interfaces/Response";
import { validate } from "class-validator";

export class OrderController implements IOrderController {
  async listOrders(req: Request, res: Response): Promise<void> {
    const orderService: OrderService = new OrderService;
    const listOrders: Order[] = await orderService.listOrders();

    const respToClient: ResponseClient = {
      code: res.statusCode,
      status: "OK",
      data: listOrders
    }

    res.json(respToClient);
  }
  
  async addOrder(req: Request, res: Response): Promise<void> {
    const orderService: OrderService = new OrderService;
    const order: Order = new Order;
    order.nama = req.body.nama;
    order.gambar = req.body.gambar;
    order.kategori = req.body.kategori;
    order.total_harga = req.body.total_harga;
    order.kuantitas = req.body.kuantitas;
    order.user = req.body.user;

    validate(order).then(async err => {
      let respToClient: ResponseClient;

      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        }

        res.status(400).json(respToClient);
        return;
      }

      const addOrder: Order = await orderService.addOrder(req.body);

      respToClient = {
        code: res.statusCode,
        status: "OK",
        data: addOrder
      }

      res.json(respToClient);
    })
  }
  
  async updateOrder(req: Request, res: Response): Promise<void> {
    const orderService: OrderService = new OrderService;
    const order: Order = new Order;
    order.nama = req.body.nama;
    order.gambar = req.body.gambar;
    order.kategori = req.body.kategori;
    order.kuantitas = req.body.kuantitas;
    order.total_harga = req.body.total_harga;
    order.user = req.body.user;

    validate(order).then(async err => {
      let respToClient: ResponseClient;
      
      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        }

        res.status(400).json(respToClient);
        return;
      }

      const id: number = Number(req.params.id);
      const updOrder: Order | null = await orderService.updateOrder(id, req.body);

      if (!updOrder) {
        respToClient = {
          code: res.status(404).statusCode,
          status: "Not Found",
          message: "Order not found"
        }

        res.status(404).json(respToClient);
        return;
      }

      respToClient = {
        code: res.statusCode,
        status: "OK",
        data: updOrder
      }

      res.json(respToClient);
    })
  }
  
  async deleteOrder(req: Request, res: Response): Promise<void> {
    const orderService: OrderService = new OrderService;
    const id: number = Number(req.params.id);
    const delOrder: number = await orderService.deleteOrder(id);
    let respToClient: ResponseClient;

    if (delOrder === 0) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "Order not found"
      }

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      message: "Order cancelled successfully"
    }

    res.json(respToClient);
  }
  
  async getOrder(req: Request, res: Response): Promise<void> {
    const orderService: OrderService = new OrderService;
    const id: number = Number(req.params.id);
    const getOrder: Order | null = await orderService.getOrder(id);
    let respToClient: ResponseClient;

    if (!getOrder) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "Order not found"
      }

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      data: getOrder
    }

    res.json(respToClient);
  }
}