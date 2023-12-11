import { IUserService } from "../interfaces/Service";
import { User } from "../models/User";
import { UserRepository } from "../repositories/User";
import bcrypt from 'bcrypt';

export class UserService implements IUserService {
  userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository;
  }

  async listUsers(): Promise<User[]> {
    const users: User[] = await this.userRepo.listUsers();

    return users;
  }

  async addUser(user: User): Promise<User | Error> {
    user.password = await bcrypt.hash(user.password, 12);

    const addUser: User | Error = await this.userRepo.addUser(user).catch(() => {
      return Error("User was existing!");
    });

    if (addUser instanceof Error) {
      return addUser;
    }
    
    return addUser;
  }

  async updateUser(id: number, user: User): Promise<User | null |Error> {
    const findUser: User | null = await this.userRepo.getUser(id);
    if (!findUser) {
      return findUser;
    }

    user.password = await bcrypt.hash(user.password, 12);

    const updUser: User | Error = await this.userRepo.updateUser(id, user).catch(() => {
      return Error("User was existing!");
    });
    
    if (updUser instanceof Error) {
      return updUser;
    }

    return updUser;
  }

  async deleteUser(id: number): Promise<number> {
    const delUser: number = await this.userRepo.deleteUser(id);

    if (delUser === 0) {
      return delUser;
    }

    return delUser;
  }
  
  async getUser(id: number): Promise<User | null> {
    const getUser: User | null = await this.userRepo.getUser(id);

    if (!getUser) {
      return getUser;
    }

    return getUser;
  }

}