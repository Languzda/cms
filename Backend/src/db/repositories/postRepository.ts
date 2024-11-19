import { BaseRepository } from "./baseRepository";
import { post, Prisma } from "@prisma/client";

export class PostRepository extends BaseRepository {
  async createPost(data: Prisma.postCreateInput): Promise<post> {
    return await this.prisma.post.create({
      data: {
        ...data,
        tags: {
          create: Array.isArray(data.tags)
            ? data.tags.map((tagId) => ({
                tag: {
                  connect: { id: tagId },
                },
              }))
            : [],
        },
      },
    });
  }

  async getPosts(options?: {
    take?: number;
    skip?: number;
    includeDeleted?: boolean;
  }) {
    return await this.prisma.post.findMany({
      where: {
        is_deleted: options?.includeDeleted ? undefined : false,
      },
      take: options?.take,
      skip: options?.skip,
      include: {
        author: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }
}
