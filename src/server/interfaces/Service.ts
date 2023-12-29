import { Cart } from "../models/Cart";
import { Category } from "../models/Category";
import { Comment } from "../models/Comment";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { UserLogin } from "../models/UserLogin";

export interface IUserService {
  listUsers(): Promise<User[]>;
  registerUser(user: User): Promise<User | Error>;
  updateUser(id: number, user: User): Promise<User | null | Error>;
  deleteUser(id: number): Promise<number>;
  getUser(id: number): Promise<User | null>;
  loginUser(user: UserLogin): Promise<User | null>;
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
  addCategory(category: Category): Promise<Category | Error>;
  updateCategory(id: number, category: Category): Promise<Category | null | Error>;
  deleteCategory(id: number): Promise<number>;
  getCategory(id: number): Promise<Category | null>;
}

export interface ICommentService {
  listComments(): Promise<Comment[]>;
  addComment(comment: Comment): Promise<Comment | Error>;
  updateComment(id: number, comment: Comment): Promise<Comment | null>;
  deleteComment(id: number): Promise<number>;
  getComment(id: number): Promise<Comment | null>;
}

export interface ICartService {
  listCarts(): Promise<Cart[]>;
  addCart(cart: Cart): Promise<Cart | Error>;
  updateCart(id: number, cart: Cart): Promise<Cart | Error | null>;
  deleteCart(id: number): Promise<number>;
  getCart(id: number): Promise<Cart | null>;
}

export interface IOrderService {
  listOrders(): Promise<Order[]>;
  addOrder(order: Order): Promise<Order>;
  updateOrder(id: number, order: Order): Promise<Order | null>;
  deleteOrder(id: number): Promise<number>;
  getOrder(id: number): Promise<Order | null>;
}