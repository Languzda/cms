import { BaseRepository } from "./baseRepository";
import { comments, Prisma } from "@prisma/client";

export class CommentRepository extends BaseRepository {
  async addComment(data: Prisma.commentsCreateInput): Promise<comments> {
    return await this.prisma.comments.create({
      data: data,
    });
  }
}