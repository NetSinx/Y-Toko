import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Comment } from "./Comment";
import { IsNotEmpty, MaxLength } from "class-validator";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', unique: true, length: 200})
  @IsNotEmpty()
  @MaxLength(200)
  nama: string;

  @Column({type: 'varchar', length: 200})
  @MaxLength(200)
  gambar: string;

  @ManyToOne(() => Category, (category) => category.product)
  kategori: Category;
  
  @Column({type: 'varchar', length: 300})
  @IsNotEmpty()
  @MaxLength(200)
  deskripsi: string;

  @Column({type: 'integer'})
  @IsNotEmpty()
  harga: number;

  @OneToMany(() => Comment, (comment) => comment.produk)
  komentar: Comment[];
}