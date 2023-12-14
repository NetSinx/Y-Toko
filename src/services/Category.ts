import { ICategoryService } from "../interfaces/Service";
import { Category } from "../models/Category";
import { CategoryRepository } from "../repositories/Category";

export class CategoryService implements ICategoryService {
  categoryRepo: CategoryRepository;

  constructor() {
    this.categoryRepo = new CategoryRepository;
  }

  async listCategories(): Promise<Category[]> {
    const listCategories: Category[] = await this.categoryRepo.listCategories();

    return listCategories;
  }

  addCategory(product: Category): Promise<Category | Error> {
    throw new Error("Method not implemented.");
  }
  updateCategory(id: number, product: Category): Promise<Category | Error | null> {
    throw new Error("Method not implemented.");
  }
  deleteCategory(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  getCategory(id: number): Promise<Category | null> {
    throw new Error("Method not implemented.");
  }
  
}