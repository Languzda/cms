import { BaseRepository } from "./baseRepository";
import { posts, Prisma } from "@prisma/client";

export class PostRepository extends BaseRepository {
  async createPost(data: Prisma.postsCreateInput): Promise<posts> {
    return this.prisma.posts.create({
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

  async deletePost(id: string): Promise<posts> {
    return this.prisma.posts.update({
      where: { id },
      data: {
        is_deleted: true,
      },
    });
  }

  async getPosts(options?: {
    take?: number;
    skip?: number;
    includeDeleted?: boolean;
  }) {
    return this.prisma.posts.findMany({
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
