import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { IsNotEmpty, MaxLength } from "class-validator";
import { User } from "./User";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 200, unique: true})
  @IsNotEmpty()
  @MaxLength(200)
  nama: string;

  @Column({type: 'varchar', length: 200})
  @MaxLength(200)
  gambar: string;

  @ManyToOne(() => Category, (category) => category.cart)
  kategori: Category;

  @Column({type: 'integer'})
  @IsNotEmpty()
  kuantitas: number;

  @Column({type: 'integer'})
  @IsNotEmpty()
  harga: number;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;
}