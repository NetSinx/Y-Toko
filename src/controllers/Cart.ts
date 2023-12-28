import { Request, Response } from "express";
import { ICartController } from "../interfaces/Controller";
import { CartService } from "../services/Cart";
import { Cart } from "../models/Cart";
import { ResponseClient } from "../interfaces/Response";
import { validate } from "class-validator";

export class CartController implements ICartController {
  async listCarts(req: Request, res: Response): Promise<void> {
    const cartService: CartService = new CartService;
    const listCarts: Cart[] = await cartService.listCarts();

    const respToClient: ResponseClient = {
      code: res.statusCode,
      status: "OK",
      data: listCarts
    }
    
    res.json(respToClient);
  }
  
  async addCart(req: Request, res: Response): Promise<void> {
    const cartService: CartService = new CartService;
    const cart: Cart = new Cart;
    cart.nama = req.body.nama;
    cart.gambar = req.body.gambar;
    cart.kategori = req.body.kategori;
    cart.harga = req.body.harga;
    cart.kuantitas = req.body.kuantitas;

    validate(cart).then(async err => {
      let respToClient: ResponseClient;

      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        }

        res.status(400).json(respToClient);
        return;
      }

      const addCart: Cart | Error = await cartService.addCart(req.body);

      if (addCart instanceof Error) {
        respToClient = {
          code: res.status(409).statusCode,
          status: "Data Conflict",
          message: addCart.message
        }

        res.status(409).json(respToClient);
        return;
      } else {
        respToClient = {
          code: res.statusCode,
          status: "OK",
          data: addCart
        }

        res.json(respToClient);
      }
    })

  }
  
  async updateCart(req: Request, res: Response): Promise<void> {
    const cartService: CartService = new CartService;
    const id: number = Number(req.params.id);
    const cart: Cart = new Cart;
    cart.nama = req.body.nama;
    cart.gambar = req.body.gambar;
    cart.kategori = req.body.kategori;
    cart.harga = req.body.harga;
    cart.kuantitas = req.body.kuantitas;

    validate(cart).then(async err => {
      let respToClient: ResponseClient;
      
      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        }

        res.status(400).json(respToClient);
        return;
      }

      const updCart: Cart | Error | null = await cartService.updateCart(id, req.body);

      if (!updCart) {
        respToClient = {
          code: res.status(404).statusCode,
          status: "Not Found",
          message: "This product not found in the cart"
        }

        res.status(404).json(respToClient);
        return;
      } else if (updCart instanceof Error) {
        respToClient = {
          code: res.status(409).statusCode,
          status: "Data Conflict",
          message: updCart.message
        }

        res.status(409).json(respToClient);
        return;
      } else {
        respToClient = {
          code: res.statusCode,
          status: "OK",
          data: updCart
        }

        res.json(respToClient);
      }
    })
  }
  
  async deleteCart(req: Request, res: Response): Promise<void> {
    const cartService: CartService = new CartService;
    const id: number = Number(req.params.id);
    const delCart: number = await cartService.deleteCart(id);
    let respToClient: ResponseClient;

    if (delCart === 0) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "This product not found in the cart"
      }

      res.status(404).json(respToClient);
      return;
    } else {
      respToClient = {
        code: res.statusCode,
        status: "OK",
        message: "Product in the cart was deleted successfully"
      }

      res.json(respToClient);
      return;
    }
  }
  
  async getCart(req: Request, res: Response): Promise<void> {
    const cartService: CartService = new CartService;
    const id: number = Number(req.params.id);
    const getCart: Cart | null = await cartService.getCart(id);
    let respToClient: ResponseClient;

    if (!getCart) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "This product not found in the cart"
      }

      res.status(404).json(respToClient);
      return;
    } else {
      respToClient = {
        code: res.statusCode,
        status: "OK",
        data: getCart
      }

      res.json(respToClient);
    }
  }
}