import { DataSource } from "typeorm";
import { ICommentRepository } from "../interfaces/Repository";
import { Comment } from "../models/Comment";
import { Config } from "../config/DataSource";
import { User } from "../models/User";
import { Product } from "../models/Product";

export class CommentRepository implements ICommentRepository {
  db: Promise<DataSource>;

  constructor() {
    this.db = new Config().initDB();
  }

  async listComments(): Promise<Comment[]> {
    const commentRepo = (await this.db).getRepository(Comment);
    const listComments: Comment[] = await commentRepo.createQueryBuilder("comment").select().leftJoinAndSelect("comment.user", "user").leftJoinAndSelect("comment.produk", "produk").getMany();

    return listComments;
  }

  async addComment(comment: Comment): Promise<Comment> {
    const commentRepo = (await this.db).getRepository(Comment);
    await commentRepo.createQueryBuilder().relation(Comment, "user").of(comment.id).set(comment.user!.id);

    await commentRepo.createQueryBuilder().relation(Comment, "produk").of(comment.id).set(comment.produk!.id);

    await commentRepo.createQueryBuilder().insert().values(comment).execute();
    
    return comment;
  }

  async updateComment(id: number, comment: Comment): Promise<Comment> {
    const commentRepo = (await this.db).getRepository(Comment);

    await commentRepo.createQueryBuilder().relation(Comment, "user").of(comment.id).set(comment.user!.id);

    await commentRepo.createQueryBuilder().relation(Comment, "produk").of(comment.id).set(comment.produk!.id);

    await commentRepo.createQueryBuilder().update().where("id = :id", {id: id}).set(comment).execute();

    return comment;
  }

  async deleteComment(id: number): Promise<number> {
    const commentRepo = (await this.db).getRepository(Comment);

    await commentRepo.createQueryBuilder().relation(Comment, "user").of(id).set(null);

    await commentRepo.createQueryBuilder().relation(Comment, "produk").of(id).set(null);

    const delComment = await commentRepo.createQueryBuilder().delete().where("id = :id", {id: id}).execute();

    return delComment.affected!;
  }

  async getComment(id: number): Promise<Comment | null> {
    const commentRepo = (await this.db).getRepository(Comment);
    const getComment: Comment | null = await commentRepo.createQueryBuilder("comment").select().leftJoinAndSelect("comment.user", "user").leftJoinAndSelect("comment.produk", "produk").where("comment.id = :id", {id: id}).getOne();

    return getComment;
  }
}