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
    const products: Product[] = await productRepo.createQueryBuilder("product")
    .select().leftJoinAndSelect("product.kategori", "kategori").leftJoinAndSelect("product.komentar", "komentar").getMany();

    return products;
  }

  async addProduct(product: Product): Promise<Product> {
    const productRepo = (await this.db).getRepository(Product);
    await productRepo.createQueryBuilder().insert().values(product).execute();
    await productRepo.createQueryBuilder().relation(Product, "kategori").of(product.id).set(product.kategori.id);

    return product;
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    const updRepo = (await this.db).getRepository(Product);
    await updRepo.createQueryBuilder().update().where("id = :id", {id: id})
    .set(product).execute();
    await updRepo.createQueryBuilder().relation(Product, "kategori").of(id).set(product.kategori.id)

    return product;
  }

  async deleteProduct(id: number): Promise<number> {
    const productRepo = (await this.db).getRepository(Product);

    await productRepo.createQueryBuilder().relation(Product, "kategori").of(id).set(null);

    const delProduct = await productRepo.createQueryBuilder().delete()
    .where("id = :id", {id: id}).execute();

    return delProduct.affected!;
  }

  async getProduct(id: number): Promise<Product | null> {
    const productRepo = (await this.db).getRepository(Product);
    const getProduct: Product | null = await productRepo.createQueryBuilder("product").leftJoinAndSelect("product.kategori", "kategori").leftJoinAndSelect("product.komentar", "komentar").where("product.id = :id", {id: id}).getOne();

    return getProduct;
  }
}