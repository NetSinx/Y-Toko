import { IProductService } from "../interfaces/Service";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { CategoryRepository } from "../repositories/Category";
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
    let addProduct: Product | Error = await this.productRepo.addProduct(product).catch(() => Error("Product was existing!"));

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

    const updProduct: Product | Error | null = await this.productRepo.updateProduct(id, product).catch(() => Error("Product was existing!"));

    if (updProduct instanceof Error) {
      return updProduct;
    }

    product = {
      id: id,
      nama: updProduct.nama,
      gambar: updProduct.gambar,
      deskripsi: updProduct.deskripsi,
      kategori: updProduct.kategori,
      harga: updProduct.harga,
      komentar: updProduct.komentar
    }
    
    return product;
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