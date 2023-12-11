import { IProductService } from "../interfaces/Service";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { ProductRepository } from "../repositories/Product";

export class ProductService implements IProductService {
  productRepo: ProductRepository;

  constructor() {
    this.productRepo = new ProductRepository;
  }

  async listProducts(): Promise<Product[]> {
    const listProducts = await this.productRepo.listProducts();

    return listProducts;
  }

  addProduct(product: Product): Promise<Product | Error> {
    throw new Error("Method not implemented.");
  }

  updateProduct(id: number, product: Product): Promise<Product | Error | null> {
    throw new Error("Method not implemented.");
  }

  deleteProduct(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }

  getProduct(id: number): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }
}