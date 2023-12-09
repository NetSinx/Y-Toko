import { IService } from "../interfaces/Service";
import { User } from "../models/User";
import { UserRepository } from "../repositories/User";
import bcrypt from 'bcrypt';

export class UserService implements IService {
  userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async listUsers(): Promise<User[]> {
    const users: User[] = await this.userRepo.listUsers();

    return users;
  }

  async addUser(user: User): Promise<User | Error> {
    const hashPassword = await bcrypt.hash(user.password, 12);
    user.password = hashPassword;

    const userRepo: User | Error = await this.userRepo.addUser(user).catch(() => {
      return Error("User was existing!");
    });

    if (userRepo instanceof Error) {
      return userRepo;
    }
    
    return userRepo;
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