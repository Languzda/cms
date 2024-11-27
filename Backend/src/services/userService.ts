import { UserRepository } from "../db/repositories";
import type { users } from "@prisma/client";
import * as bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserProfile(userId: string): Promise<users | null> {
    return this.userRepository.getUserById(userId);
  }

  async getUserByEmail(email: string): Promise<users | null> {
    return this.userRepository.getUserByEmail(email);
  }

  async getUserByLogin(login: string): Promise<users | null> {
    return this.userRepository.getUserByLogin(login);
  }

  async loginUser(userData: {
    email: string;
    password: string;
  }): Promise<users | null> {
    // Sprawdź czy użytkownik istnieje
    const user = await this.userRepository.getUserByEmail(userData.email);
    if (!user) {
      throw new Error("Nieprawidłowy email lub hasło");
    }

    // Sprawdź czy hasło jest poprawne
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Nieprawidłowy email lub hasło");
    }

    return user;
  }

  async registerUser(userData: {
    email: string;
    login: string;
    password: string;
  }): Promise<users> {
    // Check if user with given email already exists
    let existingUser = await this.userRepository.getUserByEmail(userData.email);
    if (existingUser) {
      // If exists, throw error that will be handled in controller
      throw new Error("Użytkownik już istnieje");
    }

    existingUser = await this.userRepository.getUserByLogin(userData.login);

    if (existingUser) {
      // If exists, throw error that will be handled in controller
      throw new Error("Użytkownik już istnieje");
    }

    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user with hashed password
    return this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
  }
}
