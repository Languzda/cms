import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ArticleRepository {
  async createArticle(data: { label: string; title: string; content: string }) {
    return await prisma.articles.create({
      data: data,
    });
  }
}
