import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Config } from "../config/DataSource";
import { IRepository } from "../interfaces/Repository";

export class UserRepository implements IRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }

  async listUsers(): Promise<User[]> {
    const userRepo = (await this.db).getRepository(User);
    const listUsers = await userRepo.createQueryBuilder().select().getMany();

    return listUsers;
  }

  async addUser(user: User): Promise<User> {
    const userRepo = (await this.db).getRepository(User);

    const saveUser = {
      nama: user.nama,
      username: user.username,
      email: user.email,
      password: user.password
    }

    return await userRepo.save(saveUser);
  }

  updateUser(id: number): User {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: number): number {
    throw new Error("Method not implemented.");
  }
  getUser(id: number): User {
    throw new Error("Method not implemented.");
  }
}