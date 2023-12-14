import { DataSource } from "typeorm";
import { Config } from "../config/DataSource";
import { IProductRepository } from "../interfaces/Repository";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

export class ProductRepository implements IProductRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }

  async listProducts(): Promise<Product[]> {
    const productRepo = (await this.db).getRepository(Product);
    const products: Product[] = await productRepo.createQueryBuilder("product")
    .leftJoinAndSelect("product.kategori", "kategori").leftJoinAndSelect("product.komentar", "komentar").getMany();

    return products;
  }

  async addProduct(product: Product): Promise<Product> {
    const reqAddProduct = {
      nama: product.nama,
      gambar: product.gambar,
      deskripsi: product.deskripsi,
      harga: product.harga
    }

    const productRepo = (await this.db).getRepository(Product);
    const addProduct = await productRepo.save(reqAddProduct);

    const categoryRepo = (await this.db).getRepository(Category);
    const findCategory: Category | null = await categoryRepo.findOneBy({id: product.kategori.id});
    findCategory!.product = [product];
    await categoryRepo.save(findCategory!);

    return addProduct;
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    const updProduct = {
      id: id,
      nama: product.nama,
      gambar: product.gambar,
      deskripsi: product.deskripsi,
      harga: product.harga,
    }

    const productRepo = (await this.db).getRepository(Product);
    productRepo.createQueryBuilder().update().where("id = :id", {id: id})
    .set(updProduct).execute();

    const categoryRepo = (await this.db).getRepository(Category);
    const findCategory: Category | null = await categoryRepo.findOneBy({id: product.kategori.id});
    findCategory!.product = [product];
    await categoryRepo.save(findCategory!);

    return product;
  }

  async deleteProduct(id: number): Promise<number> {
    const productRepo = (await this.db).getRepository(Product);
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