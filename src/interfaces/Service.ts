import { User } from "../models/User";

export interface IService {
  listUsers(): Promise<User[]>;
  addUser(user: User): Promise<User | Error>;
  updateUser(id: number): User;
  deleteUser(id: number): number;
  getUser(id: number): User;
}