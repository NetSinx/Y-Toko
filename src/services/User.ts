import { IUserService } from "../interfaces/Service";
import { User } from "../models/User";
import { UserLogin } from "../models/UserLogin";
import { UserRepository } from "../repositories/User";
import bcrypt from 'bcrypt';

export class UserService implements IUserService {
  userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository;
  }

  async loginUser(user: UserLogin): Promise<User | null> {
    const loginUser: User | null = await this.userRepo.loginUser(user);
    
    if (!loginUser) {
      return loginUser;
    } else {
      const verifyPassword: boolean = await bcrypt.compare(user.password, loginUser.password)

      if (!verifyPassword) {
        return null;
      } else {
        return loginUser;
      }
    }
  }

  async listUsers(): Promise<User[]> {
    const users: User[] = await this.userRepo.listUsers();

    return users;
  }

  async registerUser(user: User): Promise<User | Error> {
    user.password = await bcrypt.hash(user.password, 12);

    const addUser: User | Error = await this.userRepo.registerUser(user).catch(() => {
      return Error("User was existing!");
    });

    if (addUser instanceof Error) {
      return addUser;
    }
    
    const respAddUser: User = {
      id: addUser.id,
      nama: addUser.nama,
      username: addUser.username,
      email: addUser.email,
      password: addUser.password,
      komentar: addUser.komentar
    }
    
    return respAddUser;
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

    const respUpdUser: User = {
      id: updUser.id,
      nama: updUser.nama,
      username: updUser.username,
      email: updUser.email,
      password: updUser.password,
      komentar: updUser.komentar
    }

    return respUpdUser;
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