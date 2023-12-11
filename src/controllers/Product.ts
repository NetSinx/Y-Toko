import { Request, Response } from "express";
import { IProductController } from "../interfaces/Controller";
import { ProductService } from "../services/Product";
import { ResponseClient } from "../interfaces/Response";
import { Product } from "../models/Product";

export class ProductController implements IProductController {
  async listProducts(req: Request, res: Response): Promise<void> {
    const productService: ProductService = new ProductService;
    const listProducts: Product[] = await productService.listProducts();

    const respToClient: ResponseClient = {
      code: res.statusCode,
      status: "OK",
      data: listProducts
    };

    res.json(respToClient);
  }

  addProduct(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateProduct(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteProduct(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getProduct(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}