import { Application } from "express";
import { IRoutes } from "../interfaces/Routes";
import { CategoryController } from "../controllers/Category";
import { UserController } from "../controllers/User";
import { ProductController } from "../controllers/Product";
import { CommentController } from "../controllers/Comment";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { DoubleCsrfUtilities, doubleCsrf } from "csrf-csrf";

export class Routes implements IRoutes {
  middleware: AuthMiddleware;
  csrfProtection: DoubleCsrfUtilities;

  constructor() {
    this.middleware = new AuthMiddleware;
    this.csrfProtection = doubleCsrf({getSecret: () => "netsinx_15"});
  }

  categoryRoute(app: Application, controller: CategoryController): void {
    app.route("/category").get(controller.listCategories);
    app.route("/category/:id").get(controller.getCategory);
    app.use(this.middleware.AuthAdmin);
    app.route("/category").post(controller.addCategory);
    app.route("/category/:id").put(controller.updateCategory);
    app.route("/category/:id").delete(controller.deleteCategory);
  }
  
  productRoute(app: Application, controller: ProductController): void {
    app.route("/product").get(controller.listProducts);
    app.route("/product/:id").get(controller.getProduct);
    app.use(this.middleware.AuthAdmin);
    app.route("/product").post(controller.addProduct);
    app.route("/product/:id").put(controller.updateProduct);
    app.route("/product/:id").delete(controller.deleteProduct);
  }

  userRoute(app: Application, controller: UserController): void {
    app.route("/csrf-token").get(controller.genCSRFToken);
    app.route("/user").get(this.middleware.AuthAdmin, controller.listUsers);
    app.route("/user").post(controller.registerUser);
    app.route("/user/:id").put(this.middleware.AuthAdmin, controller.updateUser);
    app.route("/user/:id").get(this.middleware.AuthUser, controller.getUser);
    app.route("/user/:id").delete(this.middleware.AuthAdmin, controller.deleteUser);
    app.use(this.csrfProtection.doubleCsrfProtection);
    app.route("/login").post(controller.loginUser);
  }

  commentRoute(app: Application, controller: CommentController): void {
    app.use(this.middleware.AuthUser);
    app.route("/comment").get(controller.listComments);
    app.route("/comment").post(controller.addComment);
    app.route("/comment/:id").put(controller.updateComment);
    app.route("/comment/:id").delete(controller.updateComment);
    app.route("/comment/:id").get(controller.updateComment);
  }
}