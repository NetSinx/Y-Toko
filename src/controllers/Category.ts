import { Request, Response } from "express";
import { ICategoryController } from "../interfaces/Controller";
import { Category } from "../models/Category";
import { CategoryService } from "../services/Category";
import { ResponseClient } from "../interfaces/Response";

export class CategoryController implements ICategoryController {
  async listCategories(req: Request, res: Response): Promise<void> {
    const categoryService: CategoryService = new CategoryService;
    const listCategories: Category[] = await categoryService.listCategories();

    const respToClient: ResponseClient = {
      code: res.statusCode,
      status: "OK",
      data: listCategories
    }

    res.json(respToClient);
  }
  
  async addCategory(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async updateCategory(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async deleteCategory(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async getCategory(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
}