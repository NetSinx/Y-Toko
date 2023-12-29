import { ICartService } from "../interfaces/Service";
import { Cart } from "../models/Cart";
import { CartRepository } from "../repositories/Cart";

export class CartService implements ICartService {
  cartRepo: CartRepository;

  constructor() {
    this.cartRepo = new CartRepository;
  }

  async listCarts(): Promise<Cart[]> {
    const listCarts: Cart[] = await this.cartRepo.listCarts();

    return listCarts;
  }
  
  async addCart(cart: Cart): Promise<Error | Cart> {
    const addCart: Error | Cart = await this.cartRepo.addCart(cart).catch(() => Error("This product was existing in cart!"));

    if (addCart instanceof Error) {
      return addCart;
    }

    const result: Cart = {
      id: addCart.id,
      nama: addCart.nama,
      gambar: addCart.gambar,
      kategori: addCart.kategori,
      kuantitas: addCart.kuantitas,
      harga: addCart.harga,
      user: addCart.user
    }

    return result;
  }
  
  async updateCart(id: number, cart: Cart): Promise<Cart | Error | null> {
    const findProductInCart: Cart | null = await this.cartRepo.getCart(id);

    if (!findProductInCart) {
      return findProductInCart;
    }
    
    const updCart: Cart | Error = await this.cartRepo.updateCart(id, cart).catch(() => Error("This product was existing in cart!"));

    if (updCart instanceof Error) {
      return updCart;
    }

    const result: Cart = {
      id: id,
      nama: updCart.nama,
      gambar: updCart.gambar,
      kategori: updCart.kategori,
      kuantitas: updCart.kuantitas,
      harga: updCart.harga,
      user: updCart.user
    }

    return result;
  }
  
  async deleteCart(id: number): Promise<number> {
    const findProductInCart: Cart | null = await this.cartRepo.getCart(id);

    if (!findProductInCart) {
      return 0;
    }

    const delCart: number = await this.cartRepo.deleteCart(id);

    return delCart;
  }
  
  async getCart(id: number): Promise<Cart | null> {
    const getCart: Cart | null = await this.cartRepo.getCart(id);

    if (!getCart) {
      return getCart;
    }

    return getCart;
  }
}