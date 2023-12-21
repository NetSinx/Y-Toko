import { Request, Response } from "express";
import { ResponseClient } from "../interfaces/Response";
import { UserService } from "../services/User";
import { User } from "../models/User";
import { IUserController } from "../interfaces/Controller";
import { validate } from "class-validator";
import { UserLogin } from "../models/UserLogin";
import { JWTAuthToken } from "../middleware/JWTAuthToken";
import { doubleCsrf } from "csrf-csrf";

export class UserController implements IUserController {
  async genCSRFToken(req: Request, res: Response): Promise<void> {
    const { generateToken } = doubleCsrf({getSecret: () => "yasinganteng_15"});

    const csrfToken = generateToken(req, res, true);
    
    const respToClient = {
      code: res.statusCode,
      status: "OK",
      token: csrfToken
    }

    res.json(respToClient);
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    
    const userLogin: UserLogin = new UserLogin;
    userLogin.email = email;
    userLogin.password = password;

    validate(userLogin).then(async err => {
      let respToClient: ResponseClient;

      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        };
    
        res.status(400).json(respToClient);
        return;
      } else {
        const userService: UserService = new UserService;
        const login: User | null = await userService.loginUser(userLogin);
        
        if (!login) {
          respToClient = {
            code: res.status(401).statusCode,
            status: "Unauthorized",
            message: "Incorrect username / password."
          };
      
          res.status(401).json(respToClient);
        } else {
          if (login.email === "yasin03ckm@gmail.com") {
            const jwtToken: string = await new JWTAuthToken().signJWT(true);
    
            const respToken = {
              code: res.statusCode,
              status: "OK",
              token: jwtToken
            }
        
            res.json(respToken);
          } else {
            const jwtToken: string = await new JWTAuthToken().signJWT(false);
    
            const respToken = {
              code: res.statusCode,
              status: "OK",
              token: jwtToken
            }
        
            res.json(respToken);
          }
        }
      }
    })
  }
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

  async registerUser(req: Request, res: Response): Promise<void> {
    const user: User = new User;
    user.nama = req.body.nama;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    validate(user).then(async err => {
      let respToClient: ResponseClient;

      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        };
    
        res.status(400).json(respToClient);
        return;
      } else {
        const userService: UserService = new UserService;
        const addUser: User | Error = await userService.registerUser(req.body);

        if (addUser instanceof Error) {
          const respAddUser: ResponseClient = {
            code: res.status(409).statusCode,
            status: "Data Conflict",
            message: addUser.message
          };
      
          res.status(409).json(respAddUser);
          return;
        } else {
          const respAddUser: ResponseClient = {
            code: res.statusCode,
            status: "OK",
            data: addUser
          }
      
          res.json(respAddUser);
        }
      }
    })
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userService: UserService = new UserService;
    const id: number = Number(req.params.id);

    const user: User = new User;
    user.nama = req.body.nama;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    validate(user).then(async err => {
      let respToClient: ResponseClient;

      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        };
  
        res.status(400).json(respToClient);
        return;
      } else {
        const updUser: User | null | Error = await userService.updateUser(id, req.body);
        
        if (updUser instanceof Error) {
          respToClient = {
            code: res.status(409).statusCode,
            status: "Data Conflict",
            message: updUser.message
          };

          res.status(409).json(respToClient);
          return;
        } else if (!updUser) {
          respToClient = {
            code: res.status(404).statusCode,
            status: "Not Found",
            message: "User not found!"
          }

          res.status(404).json(respToClient);
          return;
        } else {
          respToClient = {
            code: res.statusCode,
            status: "OK",
            data: updUser
          }

          res.json(respToClient);
        }
      }
    })
    
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