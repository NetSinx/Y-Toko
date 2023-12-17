import { Request, Response } from "express";
import { ICommentController } from "../interfaces/Controller";
import { CommentService } from "../services/Comment";
import { Comment } from "../models/Comment";
import { ResponseClient } from "../interfaces/Response";
import { validate } from "class-validator";

export class CommentController implements ICommentController {
  async listComments(req: Request, res: Response): Promise<void> {
    const commentService: CommentService = new CommentService;
    const listComments: Comment[] = await commentService.listComments();

    const respToClient: ResponseClient = {
      code: res.statusCode,
      status: "OK",
      data: listComments
    };

    res.json(respToClient);
  }
  
  async addComment(req: Request, res: Response): Promise<void> {
    const commentService: CommentService = new CommentService;
    const comment: Comment = new Comment;
    comment.pesan = req.body.pesan;

    validate(comment).then(async err => {
      let respToClient: ResponseClient;

      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        };
  
        res.status(400).json(respToClient);
        return;
      } else {
        const addComment: Comment | Error = await commentService.addComment(req.body);

        if (addComment instanceof Error) {
          respToClient = {
            code: res.status(409).statusCode,
            status: "Data Conflict",
            message: addComment.message
          };

          res.status(409).json(respToClient);
          return;
        }

        respToClient = {
          code: res.statusCode,
          status: "OK",
          data: addComment
        };

        res.json(respToClient);
      }
    });
  }
  
  async updateComment(req: Request, res: Response): Promise<void> {
    const commentService: CommentService = new CommentService;
    const id: number = Number(req.params.id);
    const comment: Comment = new Comment;
    comment.pesan = req.body.pesan;

    validate(comment).then(async err => {
      let respToClient: ResponseClient;
      
      if (err.length > 0) {
        respToClient = {
          code: res.status(400).statusCode,
          status: "Bad Request",
          message: err
        };
  
        res.status(400).json(respToClient);
        return;
      } else {
        const updComment: Comment | null = await commentService.updateComment(id, req.body);

        if (!updComment) {
          respToClient = {
            code: res.status(404).statusCode,
            status: "Not Found",
            message: "Comment not found!"
          };

          res.status(404).json(respToClient);
          return;
        }

        respToClient = {
          code: res.statusCode,
          status: "OK",
          data: updComment
        };

        res.json(respToClient);
      }
    })
  }
  
  async deleteComment(req: Request, res: Response): Promise<void> {
    const commentService: CommentService = new CommentService;
    const id: number = Number(req.params.id);
    const delComment: number = await commentService.deleteComment(id);
    let respToClient: ResponseClient;

    if (delComment === 0) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "Comment not found!"
      };

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      message: "Comment deleted successfully!"
    };

    res.json(respToClient);
  }
  
  async getComment(req: Request, res: Response): Promise<void> {
    const commentService: CommentService = new CommentService;
    const id: number = Number(req.params.id);
    const getComment: Comment | null = await commentService.getComment(id);
    let respToClient: ResponseClient;

    if (!getComment) {
      respToClient = {
        code: res.status(404).statusCode,
        status: "Not Found",
        message: "Comment not found!"
      };

      res.status(404).json(respToClient);
      return;
    }

    respToClient = {
      code: res.statusCode,
      status: "OK",
      data: getComment
    };

    res.json(respToClient);
  }
}