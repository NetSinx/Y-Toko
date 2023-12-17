import { Application } from "express";
import { IRoutes } from "../interfaces/Routes";
import { CategoryController } from "../controllers/Category";
import { UserController } from "../controllers/User";
import { ProductController } from "../controllers/Product";
import { CommentController } from "../controllers/Comment";

export class Routes implements IRoutes {
  categoryRoute(app: Application, controller: CategoryController): void {
    app.route("/category").get(controller.listCategories);
    app.route("/category").post(controller.addCategory);
    app.route("/category/:id").put(controller.updateCategory);
    app.route("/category/:id").delete(controller.deleteCategory);
    app.route("/category/:id").get(controller.getCategory);
  }

  productRoute(app: Application, controller: ProductController): void {
    app.route("/product").get(controller.listProducts);
    app.route("/product").post(controller.addProduct);
    app.route("/product/:id").put(controller.updateProduct);
    app.route("/product/:id").get(controller.getProduct);
    app.route("/product/:id").delete(controller.deleteProduct);
  }

  userRoute(app: Application, controller: UserController): void {
    app.route("/user").get(controller.listUsers);
    app.route("/user").post(controller.registerUser);
    app.route("/user/:id").put(controller.updateUser);
    app.route("/user/:id").get(controller.getUser);
    app.route("/user/:id").delete(controller.deleteUser);
    app.route("/user").post(controller.loginUser);
  }

  commentRoute(app: Application, controller: CommentController): void {
    app.route("/comment").get(controller.listComments);
    app.route("/comment").post(controller.addComment);
    app.route("/comment/:id").put(controller.updateComment);
  }
}