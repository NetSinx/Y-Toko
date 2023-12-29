import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 200, unique: true})
  @IsNotEmpty()
  @MaxLength(200)
  nama: string;

  @OneToMany(() => Product, (product) => product.kategori)
  product: Product[];

  @OneToMany(() => Cart, (cart) => cart.kategori)
  cart: Cart[];

  @OneToMany(() => Order, (order) => order.kategori)
  order: Order[];
}