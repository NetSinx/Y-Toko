import { Request, Response } from "express";

export interface IUserController {
  listUsers(req: Request, res: Response): Promise<void>;
  addUser(req: Request, res: Response): Promise<void>;
  updateUser(req: Request, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
  getUser(req: Request, res: Response): Promise<void>;
}

export interface IProductController {
  listProducts(req: Request, res: Response): Promise<void>;
  addProduct(req: Request, res: Response): Promise<void>;
  updateProduct(req: Request, res: Response): Promise<void>;
  deleteProduct(req: Request, res: Response): Promise<void>;
  getProduct(req: Request, res: Response): Promise<void>;
}