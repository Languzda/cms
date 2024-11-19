import { BaseRepository } from "./baseRepository";
import type { user, Prisma } from "@prisma/client";

export class UserRepository extends BaseRepository {
  async createUser(data: Prisma.userCreateInput): Promise<user> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUserById(id: string): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
        settings: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserByLogin(login: string): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: { login },
    });
  }

  async updateUser(id: string, data: Prisma.userUpdateInput): Promise<user> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<user> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
