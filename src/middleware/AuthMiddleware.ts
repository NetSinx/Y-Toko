import { NextFunction, Request, Response } from "express";
import { ResponseClient } from "../interfaces/Response";
import { JWTAuthToken } from "./JWTAuthToken";
import { doubleCsrf } from "csrf-csrf";

export class AuthMiddleware {
  async AuthAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    let respToClient: ResponseClient;

    if (!req.headers.authorization) {
      respToClient = {
        code: res.status(401).statusCode,
        status: "Unauthorized",
        message: "Your access is denied"
      };

      res.status(401).json(respToClient);
      return;
    } else {
      const isValidToken: boolean = await new JWTAuthToken().verifyAdmin(req.headers.authorization.split(" ")[1]);
      
      if (!isValidToken) {
        respToClient = {
          code: res.status(401).statusCode,
          status: "Unauthorized",
          message: "Your token is invalid"
        };

        res.status(401).json(respToClient);
        return;
      }

      next();
    }
  }

  async AuthUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let respToClient: ResponseClient;

    if (!req.headers.authorization) {
      respToClient = {
        code: res.status(401).statusCode,
        status: "Unauthorized",
        message: "Your access is denied"
      };

      res.status(401).json(respToClient);
      return;
    } else {
      const isValidUser: boolean = await new JWTAuthToken().verifyUser(req.headers.authorization.split(" ")[1]);
      
      if (!isValidUser) {
        const isValidAdmin: boolean = await new JWTAuthToken().verifyAdmin(req.headers.authorization.split(" ")[1]);
      
        if (!isValidAdmin) {
          respToClient = {
            code: res.status(401).statusCode,
            status: "Unauthorized",
            message: "Your token is invalid"
          };

          res.status(401).json(respToClient);
          return;
        }

        next();
        return;
      }

      next();
    }
  }

  checkingTokenCSRF(err: Error, req: Request, res: Response, next: NextFunction): void {
    const { invalidCsrfTokenError } = doubleCsrf({getSecret: () => "yasinganteng_15"});

    if (err === invalidCsrfTokenError) {
      const respToClient: ResponseClient = {
        code: res.status(401).statusCode,
        status: "Unauthorized",
        message: err.message
      }

      res.status(401).json(respToClient);
      return;
    }

    next();
  }
}