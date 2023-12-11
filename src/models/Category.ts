import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 200})
  nama: string;

  @OneToMany(() => Product, (product) => product.kategori)
  product: Product[];
}