import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Comment } from "./Comment";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 200})
  nama: string;

  @Column({type: 'varchar', length: 200})
  gambar: string;

  @ManyToOne(() => Category, (category) => category.product)
  kategori: Category;
  
  @Column({type: 'varchar', length: 300})
  deskripsi: string;

  @OneToMany(() => Comment, (comment) => comment)
  komentar: Comment[];
}