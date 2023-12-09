import { User } from "../models/User";

export interface ResponseClient {
  code: number,
  status: string,
  message?: string,
  data?: User[] | User
}