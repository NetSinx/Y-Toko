import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Config } from "../config/DataSource";
import { IUserRepository } from "../interfaces/Repository";
import { UserLogin } from "../models/UserLogin";

export class UserRepository implements IUserRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }
  
  async loginUser(user: UserLogin): Promise<User | null> {
    const userRepo = (await this.db).getRepository(User);
    const loginUser = await userRepo.createQueryBuilder().select().where("email = :email", {email: user.email}).getOne();

    return loginUser;
  }

  async listUsers(): Promise<User[]> {
    const userRepo = (await this.db).getRepository(User);
    const listUsers = await userRepo.createQueryBuilder("user").select().leftJoinAndSelect("user.komentar", "komentar").getMany();

    return listUsers;
  }

  async registerUser(user: User): Promise<User> {
    const userRepo = (await this.db).getRepository(User);
    await userRepo.createQueryBuilder().insert().values(user).execute();

    return user;
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
    const user: User | null = await userRepo.createQueryBuilder("user").select().leftJoinAndSelect("user.komentar", "komentar").where("user.id = :id", {id: id}).getOne();

    return user;
  }
}