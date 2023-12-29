import express, { Application } from "express";
import { UserController } from "./controllers/User";
import { DataSource } from "typeorm";
import { Config } from "./config/DataSource";
import { ProductController } from "./controllers/Product";
import { CategoryController } from "./controllers/Category";
import { Routes } from "./config/Routes";
import { CommentController } from "./controllers/Comment";
import cookieParser from 'cookie-parser';
import { CartController } from "./controllers/Cart";
import { OrderController } from "./controllers/Order";
import cors from 'cors';

class App {
  app: Application;
  config: Promise<DataSource>;
  host: string;
  port: number;
  userController: UserController;
  productController: ProductController;
  categoryController: CategoryController;
  commentController: CommentController;
  cartController: CartController;
  orderController: OrderController;
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
    this.cartController = new CartController;
    this.orderController = new OrderController;

    this.app.use(express.json());
    this.app.use(cookieParser("this is a value for request cookie"));
    this.app.use(cors({origin: 'http://localhost:4200', optionsSuccessStatus: 200}))
    this.routesApp = new Routes;
    this.routesApp.categoryRoute(this.app, this.categoryController);
    this.routesApp.productRoute(this.app, this.productController);
    this.routesApp.userRoute(this.app, this.userController);
    this.routesApp.categoryRoute(this.app, this.categoryController);
    this.routesApp.commentRoute(this.app, this.commentController);
    this.routesApp.cartRoute(this.app, this.cartController);
    this.routesApp.orderRoute(this.app, this.orderController);
  }
}

const server: Application = new App().app;
const app: App = new App();

server.listen(app.port, app.host, () => {
  console.log(`Server running at http://${app.host}:${app.port}`);
})