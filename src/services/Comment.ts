import { ICommentService } from "../interfaces/Service";
import { Comment } from "../models/Comment";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { CommentRepository } from "../repositories/Comment";
import { ProductRepository } from "../repositories/Product";
import { UserRepository } from "../repositories/User";

export class CommentService implements ICommentService {
  commentRepo: CommentRepository;

  constructor() {
    this.commentRepo = new CommentRepository;
  }

  async listComments(): Promise<Comment[]> {
    const listComments: Comment[] = await this.commentRepo.listComments();

    return listComments;
  }
  
  async addComment(comment: Comment): Promise<Comment | Error> {
    const addComment: Comment | Error = await this.commentRepo.addComment(comment).catch(() => Error("Comment was existing!"));
    if (addComment instanceof Error) {
      return addComment;
    }
    
    return addComment;
  }
  
  async updateComment(id: number, comment: Comment): Promise<Comment | null> {
    const findComment: Comment | null = await this.commentRepo.getComment(id);
    if (!findComment) {
      return findComment;
    }
    
    const commentRepo = await this.commentRepo.updateComment(id, comment);

    return commentRepo;
  }
  
  async deleteComment(id: number): Promise<number> {
    const findComment: Comment | null = await this.commentRepo.getComment(id);
    if (!findComment) {
      return 0;
    }

    const delComment = await this.commentRepo.deleteComment(id);

    return delComment;
  }
  
  async getComment(id: number): Promise<Comment | null> {
    const getComment: Comment | null = await this.commentRepo.getComment(id);
    if (!getComment) {
      return getComment;
    }

    return getComment;
  }
}