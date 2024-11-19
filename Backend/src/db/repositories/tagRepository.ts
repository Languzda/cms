import { BaseRepository } from "./baseRepository";
import { tags } from "@prisma/client";

export class TagRepository extends BaseRepository {
  async createTag(name: string): Promise<tags> {
    return await this.prisma.tags.create({
      data: { name },
    });
  }
}
