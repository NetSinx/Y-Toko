import { Request, Response } from "express";
import { ICategoryController } from "../interfaces/Controller";
import { Category } from "../models/Category";
import { CategoryService } from "../services/Category";
import { ResponseClient } from "../interfaces/Response";
import { validate } from "class-validator";

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
    const category: Category = new Category;
    category.nama = req.body.nama;

    validate(category).then(async err => {
      let respToClient: ResponseClient;

      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        };

        res.status(400).json(respToClient);
        return;
      } else {
        const categoryService: CategoryService = new CategoryService;
        const addCategory: Category | Error = await categoryService.addCategory(req.body);
    
        if (addCategory instanceof Error) {
          respToClient = {
            code: res.status(409).statusCode,
            status: "Data Conflict",
            message: addCategory.message
          };
          
          res.status(409).json(respToClient);
          return;
        }
        
        respToClient = {
          code: res.statusCode,
          status: "OK",
          data: addCategory
        };
        
        res.json(respToClient);
      }
    })
  }
  
  async updateCategory(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);

    const category: Category = new Category;
    category.nama = req.body.nama;

    validate(category).then(async err => {
      let respToClient: ResponseClient;

      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        };

        res.status(400).json(respToClient);
        return;
      } else {
        const categoryService: CategoryService = new CategoryService;
        const updCategory: Category | Error | null = await categoryService.updateCategory(id, req.body);
        let respToClient: ResponseClient;

        if (updCategory instanceof Error) {
          respToClient = {
            code: res.status(409).statusCode,
            status: "Data Conflict",
            message: "Category was existing!"
          };

          res.status(409).json(respToClient);
          return;
        } else if (!updCategory) {
          respToClient = {
            code: res.status(404).statusCode,
            status: "Not Found",
            message: "Category not found!"
          };

          res.status(404).json(respToClient);
          return
        } else {
          respToClient = {
            code: res.statusCode,
            status: "OK",
            data: updCategory
          };

          res.json(respToClient);
        }
      }
    })
  }
  
  async deleteCategory(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const categoryService: CategoryService = new CategoryService;
    const delCategory: number = await categoryService.deleteCategory(id);
    let respToClient: ResponseClient;

    if (delCategory === 0) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "Category not found!"
      };

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      message: "Category deleted successfully!"
    };

    res.json(respToClient);
  }
  
  async getCategory(req: Request, res: Response): Promise<void> {
    const categoryService: CategoryService = new CategoryService;
    const id: number = Number(req.params.id);
    const getCategory: Category | null = await categoryService.getCategory(id);
    let respToClient: ResponseClient;

    if (!getCategory) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "Category not found!"
      };

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      data: getCategory
    };

    res.json(respToClient);
  }
}