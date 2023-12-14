import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { User } from "../models/User";

export interface IUserService {
  listUsers(): Promise<User[]>;
  addUser(user: User): Promise<User | Error>;
  updateUser(id: number, user: User): Promise<User | null | Error>;
  deleteUser(id: number): Promise<number>;
  getUser(id: number): Promise<User | null>;
}

export interface IProductService {
  listProducts(): Promise<Product[]>;
  addProduct(product: Product): Promise<Product | Error>;
  updateProduct(id: number, product: Product): Promise<Product | null | Error>;
  deleteProduct(id: number): Promise<number>;
  getProduct(id: number): Promise<Product | null>;
}

export interface ICategoryService {
  listCategories(): Promise<Category[]>;
  addCategory(product: Category): Promise<Category | Error>;
  updateCategory(id: number, product: Category): Promise<Category | null | Error>;
  deleteCategory(id: number): Promise<number>;
  getCategory(id: number): Promise<Category | null>;
}