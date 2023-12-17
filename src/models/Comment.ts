import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { IsNotEmpty, MaxLength } from "class-validator";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 300})
  @IsNotEmpty()
  @MaxLength(300)
  pesan: string;

  @ManyToOne(() => User, (user) => user.komentar)
  user: User;

  @ManyToOne(() => Product, (product) => product.komentar)
  produk: Product;
}