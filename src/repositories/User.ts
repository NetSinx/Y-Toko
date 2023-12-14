import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Config } from "../config/DataSource";
import { IUserRepository } from "../interfaces/Repository";

export class UserRepository implements IUserRepository {
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

    return await userRepo.save(user);
  }

  async updateUser(id: number, user: User): Promise<User> {
    const userRepo = (await this.db).getRepository(User);
    await userRepo.createQueryBuilder().update().where("id = :id", {id: id}).set(user)
    .execute();
    
    user.id = id;

    return user;
  }

  async deleteUser(id: number): Promise<number> {
    const userRepo = (await this.db).getRepository(User);
    const delUser = await userRepo.createQueryBuilder().delete()
    .where("id = :id", {id: id}).execute();

    return delUser.affected!;
  }
  
  async getUser(id: number): Promise<User | null> {
    const userRepo = (await this.db).getRepository(User);
    const user: User | null = await userRepo.createQueryBuilder().select().where("id = :id", {id: id}).getOne();

    return user;
  }
}