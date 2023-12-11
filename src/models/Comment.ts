import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 300})
  pesan: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (product) => product.komentar)
  produk: Product;
}