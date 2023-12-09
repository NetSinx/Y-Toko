import express, { Application } from "express";
import { UserController } from "./controllers/User";
import { DataSource } from "typeorm";
import { Config } from "./config/DataSource";

class App {
  app: Application;
  config: Promise<DataSource>;
  host: string;
  port: number;
  userController: UserController;

  constructor() {
    this.app = express();
    this.config = new Config().initDB();
    this.host = "localhost";
    this.port = 3000;
    this.userController = new UserController();
    this.routeUser();
  }

  routeUser(): void {
    this.app.use(express.json());
    this.app.route("/users").get(this.userController.listUsers);
    this.app.route("/users").post(this.userController.addUser);
  }
}

const server: Application = new App().app;
const app: App = new App();

server.listen(app.port, app.host, () => {
  console.log(`Server running at http://${app.host}:${app.port}`);
})