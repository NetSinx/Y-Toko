import { Request, Response } from "express";
import { ResponseClient } from "../interfaces/Response";
import { UserService } from "../services/User";
import { User } from "../models/User";
import { IController } from "../interfaces/Controller";

export class UserController implements IController {
  async listUsers(req: Request, res: Response): Promise<void> {
    const userService: UserService = new UserService();
    const listUsers: User[] = await userService.listUsers();
    const respToClient: ResponseClient = {
      code: res.statusCode,
      status: "OK",
      data: listUsers
    }
  
    res.status(200).json(respToClient);
  }

  async addUser(req: Request, res: Response): Promise<void> {
    const userService: UserService = new UserService();
    const reqAddUser: any = req.body;
    await userService.addUser(reqAddUser).then(data => {
      if (data instanceof Error) {
        const respAddUser: ResponseClient = {
          code: res.status(409).statusCode,
          status: "Data Conflict",
          message: data.message
        }
    
        res.status(409).json(respAddUser);
        return;
      } else {
        const user = {
          id: data.id,
          nama: data.nama,
          username: data.username,
          email: data.email,
          password: data.password,
        }
    
        const respAddUser: ResponseClient = {
          code: res.statusCode,
          status: "OK",
          data: user
        }
    
        res.json(respAddUser);
      }
    })
  }

  updateUser(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
  deleteUser(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
  getUser(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
}