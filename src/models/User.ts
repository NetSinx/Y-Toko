import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 200})
  @IsNotEmpty()
  @MaxLength(200)
  nama: string;
  
  @Column({type: "varchar", length: 100, unique: true})
  @IsNotEmpty()
  @MaxLength(100)
  username: string;
  
  @Column({type: "varchar", length: 100, unique: true})
  @IsNotEmpty()
  @IsEmail(undefined, {message: "Email format doesn't valid."})
  @MaxLength(100)
  email: string;

  @Column({type: "varchar", length: 200})
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_-]).*$/,
  {message: "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character."})
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  komentar: Comment[];
}