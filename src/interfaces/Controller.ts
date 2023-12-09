import { Request, Response } from "express";

export interface IController {
  listUsers(req: Request, res: Response): Promise<void>;
  addUser(req: Request, res: Response): void;
  updateUser(req: Request, res: Response): void;
  deleteUser(req: Request, res: Response): void;
  getUser(req: Request, res: Response): void;
}