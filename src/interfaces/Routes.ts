import { Application } from "express";
import { CategoryController } from "../controllers/Category";
import { ProductController } from "../controllers/Product";
import { UserController } from "../controllers/User";
import { CommentController } from "../controllers/Comment";

export interface IRoutes {
  categoryRoute(app: Application, controller: CategoryController): void;
  productRoute(app: Application, controller: ProductController): void;
  userRoute(app: Application, controller: UserController): void;
  commentRoute(app: Application, controller: CommentController): void;
}