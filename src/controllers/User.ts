import { Request, Response } from "express";
import { ResponseClient } from "../interfaces/Response";
import { UserService } from "../services/User";
import { User } from "../models/User";
import { IUserController } from "../interfaces/Controller";

export class UserController implements IUserController {
  async listUsers(req: Request, res: Response): Promise<void> {
    const userService: UserService = new UserService;
    const listUsers: User[] = await userService.listUsers();
    const respToClient: ResponseClient = {
      code: res.statusCode,
      status: "OK",
      data: listUsers
    }
  
    res.status(200).json(respToClient);
  }

  async addUser(req: Request, res: Response): Promise<void> {
    const userService: UserService = new UserService;
    const reqAddUser: any = req.body;
    const addUser: User | Error = await userService.addUser(reqAddUser);

    if (addUser instanceof Error) {
      const respAddUser: ResponseClient = {
        code: res.status(409).statusCode,
        status: "Data Conflict",
        message: addUser.message
      }
  
      res.status(409).json(respAddUser);
      return;
    } else {
      const user = {
        id: addUser.id,
        nama: addUser.nama,
        username: addUser.username,
        email: addUser.email,
        password: addUser.password,
      }
  
      const respAddUser: ResponseClient = {
        code: res.statusCode,
        status: "OK",
        data: user
      }
  
      res.json(respAddUser);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userService: UserService = new UserService;
    const id: number = Number(req.params.id);
    const reqUpdUser: User = req.body;
    const updUser: User | null | Error = await userService.updateUser(id, reqUpdUser);
    
    if (updUser instanceof Error) {
      const respUpdUser: ResponseClient = {
        code: res.status(409).statusCode,
        status: "Data Conflict",
        message: updUser.message
      }

      res.status(409).json(respUpdUser);
    } else if (!updUser) {
      const respUpdUser: ResponseClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "User not found!"
      }

      res.status(404).json(respUpdUser);
    } else {
      const user = {
        id: updUser.id,
        nama: updUser.nama,
        username: updUser.username,
        email: updUser.email,
        password: updUser.password,
      }

      const respToClient: ResponseClient = {
        code: res.statusCode,
        status: "OK",
        data: user
      }

      res.json(respToClient);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const userService: UserService = new UserService;
    const delUser: number = await userService.deleteUser(id);

    if (delUser === 0) {
      const respToClient: ResponseClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "User not found!"
      }

      res.status(404).json(respToClient);
    } else {
      const respToClient: ResponseClient = {
        code: res.statusCode,
        status: "OK",
        message: "User deleted successfully!"
      }

      res.json(respToClient);
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const userService: UserService = new UserService;
    const getUser: User | null = await userService.getUser(id);

    if (!getUser) {
      const respToClient: ResponseClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "User not found!"
      }

      res.status(404).json(respToClient);
    } else {
      const respToClient: ResponseClient = {
        code: res.statusCode,
        status: "OK",
        data: getUser
      }

      res.json(respToClient);
    }
  }
}