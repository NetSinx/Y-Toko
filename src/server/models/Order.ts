import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { IsNotEmpty, MaxLength } from "class-validator";
import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 200, unique: true})
  @IsNotEmpty()
  @MaxLength(200)
  nama: string;

  @Column({type: 'varchar', length: 200})
  @MaxLength(200)
  gambar: string;

  @ManyToOne(() => Category, (category) => category.order)
  kategori: Category;

  @Column({type: 'integer'})
  @IsNotEmpty()
  kuantitas: number;

  @Column({type: 'integer'})
  @IsNotEmpty()
  total_harga: number;

  @ManyToOne(() => User, (user) => user.order)
  user: User;
}