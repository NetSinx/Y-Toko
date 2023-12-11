import express, { Application } from "express";
import { UserController } from "./controllers/User";
import { DataSource } from "typeorm";
import { Config } from "./config/DataSource";
import { ProductController } from "./controllers/Product";

class App {
  app: Application;
  config: Promise<DataSource>;
  host: string;
  port: number;
  userController: UserController;
  productController: ProductController;

  constructor() {
    this.app = express();
    this.config = new Config().initDB();
    this.host = "localhost";
    this.port = 3000;
    this.userController = new UserController;
    this.productController = new ProductController;
    this.routeUser();
    this.routeProduct();
  }

  routeUser(): void {
    this.app.use(express.json());
    this.app.route("/users").get(this.userController.listUsers);
    this.app.route("/users").post(this.userController.addUser);
    this.app.route("/users/:id").put(this.userController.updateUser);
    this.app.route("/users/:id").get(this.userController.getUser);
    this.app.route("/users/:id").delete(this.userController.deleteUser);
  }

  routeProduct(): void {
    this.app.route("/products").get(this.productController.listProducts);
  }
}

const server: Application = new App().app;
const app: App = new App();

server.listen(app.port, app.host, () => {
  console.log(`Server running at http://${app.host}:${app.port}`);
})