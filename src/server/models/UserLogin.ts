import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}