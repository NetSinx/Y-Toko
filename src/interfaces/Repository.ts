import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { Comment } from "../models/Comment";
import { UserLogin } from "../models/UserLogin";
import { Cart } from "../models/Cart";
import { Order } from "../models/Order";

export interface IUserRepository {
  listUsers(): Promise<User[]>;
  registerUser(user: User): Promise<User>;
  updateUser(id: number, user: User): Promise<User>;
  deleteUser(id: number): Promise<number>;
  getUser(id: number): Promise<User | null>;
  loginUser(user: UserLogin): Promise<User | null>;
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
  addCategory(category: Category): Promise<Category>;
  updateCategory(id: number, category: Category): Promise<Category>;
  deleteCategory(id: number, product: Product): Promise<number>;
  getCategory(id: number): Promise<Category | null>;
}

export interface ICommentRepository {
  listComments(): Promise<Comment[]>;
  addComment(comment: Comment): Promise<Comment>;
  updateComment(id: number, comment: Comment): Promise<Comment>;
  deleteComment(id: number): Promise<number>;
  getComment(id: number): Promise<Comment | null>;
}

export interface ICartRepository {
  listCarts(): Promise<Cart[]>;
  addCart(cart: Cart): Promise<Cart>;
  updateCart(id: number, cart: Cart): Promise<Cart>;
  deleteCart(id: number): Promise<number>;
  getCart(id: number): Promise<Cart | null>;
}

export interface IOrderRepository {
  listOrders(): Promise<Order[]>;
  addOrder(order: Order): Promise<Order>;
  updateOrder(id: number, order: Order): Promise<Order>;
  deleteOrder(id: number): Promise<number>;
  getOrder(id: number): Promise<Order | null>;
}