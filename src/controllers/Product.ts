import { Request, Response } from "express";
import { IProductController } from "../interfaces/Controller";
import { ProductService } from "../services/Product";
import { ResponseClient } from "../interfaces/Response";
import { Product } from "../models/Product";

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
    const addProduct: Product | Error = await productService.addProduct(req.body);

    let respToClient: ResponseClient;

    if (addProduct instanceof Error) {
      respToClient = {
        code: res.status(409).statusCode,
        status: "Data Conflict",
        message: addProduct.message
      }

      res.status(409).json(respToClient);
      return;
    }

    const product: Product = {
      id: addProduct.id,
      nama: addProduct.nama,
      gambar: addProduct.gambar,
      kategori: addProduct.kategori,
      deskripsi: addProduct.deskripsi,
      harga: addProduct.harga,
      komentar: addProduct.komentar
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      data: product
    }

    res.json(respToClient);
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const productService: ProductService = new ProductService;
    const id: number = Number(req.params.id);
    const updProduct = await productService.updateProduct(id, req.body);

    let respToClient: ResponseClient;

    if (updProduct instanceof Error) {
      respToClient = {
        code: res.status(409).statusCode,
        status: "Data Conflict",
        message: "Product was existing!"
      }

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
      const product: Product = {
        id: id,
        nama: updProduct.nama,
        gambar: updProduct.gambar,
        kategori: updProduct.kategori,
        deskripsi: updProduct.deskripsi,
        harga: updProduct.harga,
        komentar: updProduct.komentar
      }

      respToClient = {
        code: res.statusCode,
        status: "OK",
        data: product
      }

      res.json(respToClient);
    }
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
      }

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      message: "Product deleted successfully!"
    }

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
      }

      res.status(404).json(respToClient);
      return;
    }

    const product: Product = {
      id: getProduct.id,
      nama: getProduct.nama,
      gambar: getProduct.gambar,
      deskripsi: getProduct.deskripsi,
      kategori: getProduct.kategori,
      harga: getProduct.harga,
      komentar: getProduct.komentar
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      data: product
    }

    res.json(respToClient);
  }
}