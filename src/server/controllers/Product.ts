import { Request, Response } from "express";
import { IProductController } from "../interfaces/Controller";
import { ProductService } from "../services/Product";
import { ResponseClient } from "../interfaces/Response";
import { Product } from "../models/Product";
import { validate } from "class-validator";

export class ProductController implements IProductController {
  async listProducts(req: Request, res: Response): Promise<void> {
    const productService: ProductService = new ProductService;
    const listProducts: Product[] = await productService.listProducts();

    const respToClient: ResponseClient = {
      code: res.statusCode,
      status: "OK",
      data: listProducts
    };

    res.json(respToClient);
  }

  async addProduct(req: Request, res: Response): Promise<void> {
    const productService: ProductService = new ProductService;
    const product: Product = new Product;
    product.nama = req.body.nama;
    product.gambar = req.body.gambar;
    product.deskripsi = req.body.deskripsi;
    product.kategori = req.body.kategori;
    product.stok = req.body.stok;
    product.harga = req.body.harga;
    product.komentar = req.body.komentar;

    validate(product).then(async err => {
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
        const addProduct: Product | Error = await productService.addProduct(req.body);

        if (addProduct instanceof Error) {
          respToClient = {
            code: res.status(409).statusCode,
            status: "Data Conflict",
            message: addProduct.message
          };

          res.status(409).json(respToClient);
          return;
        }

        respToClient = {
          code: res.statusCode,
          status: "OK",
          data: addProduct
        };

        res.json(respToClient);
      }
    });
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const productService: ProductService = new ProductService;
    const id: number = Number(req.params.id);
    const product: Product = new Product;
    product.nama = req.body.nama;
    product.gambar = req.body.gambar;
    product.deskripsi = req.body.deskripsi;
    product.kategori = req.body.kategori;
    product.harga = req.body.harga;
    product.komentar = req.body.komentar;

    validate(product).then(async err => {
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
        const updProduct = await productService.updateProduct(id, req.body);

        if (updProduct instanceof Error) {
          respToClient = {
            code: res.status(409).statusCode,
            status: "Data Conflict",
            message: updProduct.message
          };

          res.status(409).json(respToClient);
          return;
        } else if (!updProduct) {
          respToClient = {
            code: res.status(404).statusCode,
            status: "Not Found",
            message: "Product not found!"
          }

          res.status(404).json(respToClient);
          return;
        } else {
          respToClient = {
            code: res.statusCode,
            status: "OK",
            data: updProduct
          };

          res.json(respToClient);
        }
      }
    })
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const productService: ProductService = new ProductService;
    const id: number = Number(req.params.id);
    const delProduct: number = await productService.deleteProduct(id);

    let respToClient: ResponseClient;

    if (delProduct === 0) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "Product not found!"
      };

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      message: "Product deleted successfully!"
    };

    res.json(respToClient);
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    const productService: ProductService = new ProductService;
    const id: number = Number(req.params.id);
    const getProduct: Product | null = await productService.getProduct(id);

    let respToClient: ResponseClient;

    if (!getProduct) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "Product not found!"
      };

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      data: getProduct
    };

    res.json(respToClient);
  }
}