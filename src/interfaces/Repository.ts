import { User } from "../models/User";

export interface IRepository {
  listUsers(): Promise<User[]>;
  addUser(user: User): Promise<User>;
  updateUser(id: number): User;
  deleteUser(id: number): number;
  getUser(id: number): User;
}