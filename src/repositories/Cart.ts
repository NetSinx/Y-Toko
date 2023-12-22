import { DataSource } from "typeorm";
import { ICartRepository } from "../interfaces/Repository";
import { Cart } from "../models/Cart";
import { Config } from "../config/DataSource";

export class CartRepository implements ICartRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }

  async listCarts(): Promise<Cart[]> {
    const cartRepo = (await this.db).getRepository(Cart);
    const listCarts: Cart[] = await cartRepo.createQueryBuilder().select().getMany();

    return listCarts;
  }

  async addCart(cart: Cart): Promise<Cart> {
    const cartRepo = (await this.db).getRepository(Cart);
    await cartRepo.createQueryBuilder().insert().values(cart).execute();
    
    return cart;
  }

  async updateCart(id: number, cart: Cart): Promise<Cart> {
    const cartRepo = (await this.db).getRepository(Cart);
    await cartRepo.createQueryBuilder().update().where("id = :id", {id: id}).set(cart).execute();

    return cart;
  }

  async deleteCart(id: number): Promise<number> {
    const cartRepo = (await this.db).getRepository(Cart);
    const delRepo = await cartRepo.createQueryBuilder().delete().where("id = :id", {id: id}).execute();

    return delRepo.affected!;
  }

  async getCart(id: number): Promise<Cart | null> {
    const cartRepo = (await this.db).getRepository(Cart);
    const getCart: Cart | null = await cartRepo.createQueryBuilder().select().where("id = :id", {id: id}).getOne();

    return getCart;
  }
}