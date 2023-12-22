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
    app.route("/category").post(this.middleware.AuthAdmin, controller.addCategory);
    app.route("/category/:id").put(this.middleware.AuthAdmin, controller.updateCategory);
    app.route("/category/:id").delete(this.middleware.AuthAdmin, controller.deleteCategory);
  }
  
  productRoute(app: Application, controller: ProductController): void {
    app.route("/product").get(controller.listProducts);
    app.route("/product").post(this.middleware.AuthAdmin, controller.addProduct);
    app.route("/product/:id").put(this.middleware.AuthAdmin, controller.updateProduct);
    app.route("/product/:id").delete(this.middleware.AuthAdmin, controller.deleteProduct);
    app.route("/product/:id").get(controller.getProduct);
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
    app.route("/comment").get(this.middleware.AuthUser, controller.listComments);
    app.route("/comment").post(this.middleware.AuthUser, controller.addComment);
    app.route("/comment/:id").put(this.middleware.AuthUser, controller.updateComment);
    app.route("/comment/:id").delete(this.middleware.AuthUser, controller.updateComment);
    app.route("/comment/:id").get(this.middleware.AuthUser, controller.updateComment);
  }
}