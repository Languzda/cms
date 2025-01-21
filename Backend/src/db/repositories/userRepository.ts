import { BaseRepository } from "./baseRepository";
import type { users, Prisma } from "@prisma/client";

export class UserRepository extends BaseRepository {
  async createUser(data: Prisma.usersCreateInput): Promise<users> {
    return this.prisma.users.create({
      data,
    });
  }

  async getUserById(id: string): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        posts: true,
        settings: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async getUserByLogin(login: string): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: { login },
    });
  }

  async getAllUsers(): Promise<users[]> {
    return this.prisma.users.findMany();
  }

  async updateUser(id: string, data: Prisma.usersUpdateInput): Promise<users> {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<users> {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
