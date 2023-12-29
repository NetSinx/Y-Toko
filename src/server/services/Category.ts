import { ICategoryService } from "../interfaces/Service";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { CategoryRepository } from "../repositories/Category";
import { ProductRepository } from "../repositories/Product";

export class CategoryService implements ICategoryService {
  categoryRepo: CategoryRepository;

  constructor() {
    this.categoryRepo = new CategoryRepository;
  }

  async listCategories(): Promise<Category[]> {
    const listCategories: Category[] = await this.categoryRepo.listCategories();

    return listCategories;
  }
  
  async addCategory(category: Category): Promise<Category | Error> {
    const addCategory: Category | Error = await this.categoryRepo.addCategory(category).catch(() => Error("Category was existing!"));

    if (addCategory instanceof Error) {
      return addCategory;
    }
    
    category = {
      id: addCategory.id,
      nama: addCategory.nama,
      product: addCategory.product,
      cart: addCategory.cart,
      order: addCategory.order
    }

    return category;
  }
  
  async updateCategory(id: number, category: Category): Promise<Category | Error | null> {
    if (!category) {
      return Error("Request doesn't match!");
    }

    const findCategory: Category | null = await this.categoryRepo.getCategory(id);
    if (!findCategory) {
      return findCategory;
    }

    const reqUpdProduct: Category = {
      id: id,
      nama: category.nama,
      product: category.product,
      cart: category.cart,
      order: category.order
    }

    const updCategory: Category | Error = await this.categoryRepo.updateCategory(id, reqUpdProduct).catch(() => Error("Category was existing!"));
    
    if (updCategory instanceof Error) {
      return updCategory;
    } else {
      category = {
        id: id,
        nama: updCategory.nama,
        product: updCategory.product,
        cart: updCategory.cart,
        order: updCategory.order
      }

      return category;
    }
  }
  
  async deleteCategory(id: number): Promise<number> {
    const productRepo: ProductRepository = new ProductRepository;
    const findCategory: Category | null = await this.categoryRepo.getCategory(id);
    
    if (!findCategory) {
      return 0;
    };
    
    for (let i: number = 0; i < findCategory!.product.length; i++) {
      const findProduct: Product | null = await productRepo.getProduct(findCategory!.product[i].id);

      if (findCategory!.product[i].id === findProduct!.id) {
        const delCategory: number = await this.categoryRepo.deleteCategory(id, findCategory!.product[i]);
        
        return delCategory;
      }
    }

    const deleteCategory: number = await this.categoryRepo.deleteCategory(id, new Product);

    return deleteCategory;
  }
  
  
  async getCategory(id: number): Promise<Category | null> {
    const getCategory: Category | null = await this.categoryRepo.getCategory(id);
    if (!getCategory) {
      return getCategory;
    }

    return getCategory;
  }
}