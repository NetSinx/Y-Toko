import { Request, Response } from "express";

export interface IUserController {
  listUsers(req: Request, res: Response): Promise<void>;
  registerUser(req: Request, res: Response): Promise<void>;
  updateUser(req: Request, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
  getUser(req: Request, res: Response): Promise<void>;
  loginUser(req: Request, res: Response): Promise<void>;
}

export interface IProductController {
  listProducts(req: Request, res: Response): Promise<void>;
  addProduct(req: Request, res: Response): Promise<void>;
  updateProduct(req: Request, res: Response): Promise<void>;
  deleteProduct(req: Request, res: Response): Promise<void>;
  getProduct(req: Request, res: Response): Promise<void>;
}

export interface ICategoryController {
  listCategories(req: Request, res: Response): Promise<void>;
  addCategory(req: Request, res: Response): Promise<void>;
  updateCategory(req: Request, res: Response): Promise<void>;
  deleteCategory(req: Request, res: Response): Promise<void>;
  getCategory(req: Request, res: Response): Promise<void>;
}

export interface ICommentController {
  listComments(req: Request, res: Response): Promise<void>;
  addComment(req: Request, res: Response): Promise<void>;
  updateComment(req: Request, res: Response): Promise<void>;
  deleteComment(req: Request, res: Response): Promise<void>;
  getComment(req: Request, res: Response): Promise<void>;
}

export interface ICartController {
  listCarts(req: Request, res: Response): Promise<void>;
  addCart(req: Request, res: Response): Promise<void>;
  updateCart(req: Request, res: Response): Promise<void>;
  deleteCart(req: Request, res: Response): Promise<void>;
  getCart(req: Request, res: Response): Promise<void>;
}

export interface IOrderController {
  listOrders(req: Request, res: Response): Promise<void>;
  addOrder(req: Request, res: Response): Promise<void>;
  updateOrder(req: Request, res: Response): Promise<void>;
  deleteOrder(req: Request, res: Response): Promise<void>;
  getOrder(req: Request, res: Response): Promise<void>;
}