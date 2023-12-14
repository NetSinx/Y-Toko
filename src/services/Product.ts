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

  async addProduct(product: Product): Promise<Product | Error> {
    const addProduct = await this.productRepo.addProduct(product).catch((err) => {
      return Error("Product was existing!");
    });

    if (addProduct instanceof Error) {
      return addProduct;
    } else {
      return addProduct;
    }
  }

  async updateProduct(id: number, product: Product): Promise<Product | Error | null> {
    const findProduct: Product | null = await this.productRepo.getProduct(id);

    if (!findProduct) {
      return findProduct;
    }

    const updProduct = await this.productRepo.updateProduct(id, product).catch(() => {
      return Error("Product was existing!");
    })

    if (updProduct instanceof Error) {
      return updProduct;
    } else {
      return updProduct;
    }
  }

  async deleteProduct(id: number): Promise<number> {
    const findProduct: Product | null = await this.productRepo.getProduct(id);
    if (!findProduct) {
      return 0;
    }

    return await this.productRepo.deleteProduct(id);
  }

  async getProduct(id: number): Promise<Product | null> {
    const getProduct: Product | null = await this.productRepo.getProduct(id);

    return getProduct;
  }
}