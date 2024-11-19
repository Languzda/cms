import { PrismaClient } from "@prisma/client";
import { prisma } from "../client";

export abstract class BaseRepository {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
}
