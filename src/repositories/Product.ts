import { DataSource } from "typeorm";
import { Config } from "../config/DataSource";
import { IProductRepository } from "../interfaces/Repository";
import { Product } from "../models/Product";

export class ProductRepository implements IProductRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }

  async listProducts(): Promise<Product[]> {
    const productRepo = (await this.db).getRepository(Product);
    const products: Product[] = await productRepo.createQueryBuilder().select().getMany();

    return products;
  }

  addProduct(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  updateProduct(id: number, product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  deleteProduct(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }

  getProduct(id: number): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }
}