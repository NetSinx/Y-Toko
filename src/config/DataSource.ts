import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Comment } from '../models/Comment';
import { Cart } from '../models/Cart';
import { Order } from '../models/Order';

dotenv.config();

export class Config {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dataSource: DataSource;

  constructor() {
    this.host = process.env.DB_HOST!;
    this.port = Number(process.env.DB_PORT!);
    this.username = process.env.DB_USER!;
    this.password = process.env.DB_PASS!;
    this.database = process.env.DB_NAME!;
    this.dataSource = new DataSource({
      type: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: [User, Product, Category, Comment, Cart, Order],
      migrations: ["./src/migrations/*.ts"],
      synchronize: false,
      logging: true
    })
  }

  async initDB(): Promise<DataSource> {
    return await this.dataSource.initialize();
  }
}

export const dataSource: DataSource = new Config().dataSource;