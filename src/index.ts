import express, { Application } from "express";
import { UserController } from "./controllers/User";
import { DataSource } from "typeorm";
import { Config } from "./config/DataSource";
import { ProductController } from "./controllers/Product";
import { CategoryController } from "./controllers/Category";
import { Routes } from "./config/Routes";
import { CommentController } from "./controllers/Comment";

class App {
  app: Application;
  config: Promise<DataSource>;
  host: string;
  port: number;
  userController: UserController;
  productController: ProductController;
  categoryController: CategoryController;
  commentController: CommentController;
  routesApp: Routes;

  constructor() {
    this.app = express();
    this.config = new Config().initDB();
    this.host = "localhost";
    this.port = 3000;

    this.userController = new UserController;
    this.productController = new ProductController;
    this.categoryController = new CategoryController;
    this.commentController = new CommentController;

    this.app.use(express.json());

    this.routesApp = new Routes;
    this.routesApp.categoryRoute(this.app, this.categoryController);
    this.routesApp.productRoute(this.app, this.productController);
    this.routesApp.userRoute(this.app, this.userController);
    this.routesApp.categoryRoute(this.app, this.categoryController);
    this.routesApp.commentRoute(this.app, this.commentController);
  }
}

const server: Application = new App().app;
const app: App = new App();

server.listen(app.port, app.host, () => {
  console.log(`Server running at http://${app.host}:${app.port}`);
})