import { DataSource } from "typeorm";
import { ICategoryRepository } from "../interfaces/Repository";
import { Category } from "../models/Category";
import { Config } from "../config/DataSource";
import { Product } from "../models/Product";

export class CategoryRepository implements ICategoryRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }

  async listCategories(): Promise<Category[]> {
    const categoryRepo = (await this.db).getRepository(Category);
    const listCategories: Category[] = await categoryRepo.createQueryBuilder("category")
    .leftJoinAndSelect("category.product", "produk").getMany();

    return listCategories;
  }

  async addCategory(category: Category): Promise<Category> {
    const categoryRepo = (await this.db).getRepository(Category);
    await categoryRepo.createQueryBuilder().insert().values(category).execute();

    return category;
  }

  async updateCategory(id: number, category: Category): Promise<Category> {
    const categoryRepo = (await this.db).getRepository(Category);
    await categoryRepo.createQueryBuilder().update().where("id = :id", {id: id}).set(category).execute();

    return category;
  }

  async deleteCategory(id: number, product: Product): Promise<number> {
    const categoryRepo = (await this.db).getRepository(Category);

    await categoryRepo.createQueryBuilder().relation(Category, "product").of(id).remove(product.id);

    const delCategory = await categoryRepo.createQueryBuilder().delete().where("id = :id", {id: id}).execute();
    
    return delCategory.affected!;
  }

  async getCategory(id: number): Promise<Category | null> {
    const categoryRepo = (await this.db).getRepository(Category);
    const getCategory: Category | null = await categoryRepo.createQueryBuilder("category").select().leftJoinAndSelect("category.product", "produk").where("category.id = :id", {id: id}).getOne();

    return getCategory;
  }
}