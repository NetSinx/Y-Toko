import { DataSource } from "typeorm";
import { ICategoryRepository } from "../interfaces/Repository";
import { Category } from "../models/Category";
import { Config } from "../config/DataSource";

export class CategoryRepository implements ICategoryRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }

  async listCategories(): Promise<Category[]> {
    const categoryRepo = (await this.db).getRepository(Category);
    const listCategories: Category[] = await categoryRepo.createQueryBuilder()
    .select().getMany();

    return listCategories;
  }

  addCategory(product: Category): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  updateCategory(id: number, product: Category): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  deleteCategory(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  getCategory(id: number): Promise<Category | null> {
    throw new Error("Method not implemented.");
  }
}