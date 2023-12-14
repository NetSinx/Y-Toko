import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { User } from "../models/User";

export interface IUserRepository {
  listUsers(): Promise<User[]>;
  addUser(user: User): Promise<User>;
  updateUser(id: number, user: User): Promise<User>;
  deleteUser(id: number): Promise<number>;
  getUser(id: number): Promise<User | null>;
}

export interface IProductRepository {
  listProducts(): Promise<Product[]>;
  addProduct(product: Product): Promise<Product>;
  updateProduct(id: number, product: Product): Promise<Product>;
  deleteProduct(id: number): Promise<number>;
  getProduct(id: number): Promise<Product | null>;
}

export interface ICategoryRepository {
  listCategories(): Promise<Category[]>;
  addCategory(product: Category): Promise<Category>;
  updateCategory(id: number, product: Category): Promise<Category>;
  deleteCategory(id: number): Promise<number>;
  getCategory(id: number): Promise<Category | null>;
}