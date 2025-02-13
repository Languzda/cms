import { UserService } from "../services/userService";
import type { Request, Response } from "express";
import { config } from "../config/environment";

import jwt from "jsonwebtoken";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({ message: "Brak wymaganych danych"});
      }

      const user = await this.userService.registerUser({
        email,
        password,
        login: username,
      });

      return res.status(201).json({
        user,
        message: "Użytkownik został zarejestrowany pomyślnie",
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Użytkownik już istnieje"
      ) {
        return res.status(400).json({ message: error.message });
      }
      console.log(error);
      return res.status(500).json({ message: "Błąd serwera" });
    }
  }

  //TODO: Add login logic
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.userService.loginUser({ email, password });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Nieprawidłowy email lub hasło" });
      }

      // Generowanie tokena JWT
      const token = jwt.sign(
        { userId: user.id }, // Zastąp rzeczywistym ID użytkownika
        process.env.JWT_SECRET || "tajny_klucz",
        { expiresIn: config.jwt.expiresIn }
      );

      return res.status(200).json({
        message: "Zalogowano pomyślnie",
        token,
        userId:user.id,
        userRole: user.role,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Wystąpił błąd podczas logowania",
        error: error instanceof Error ? error.message : "Nieznany błąd",
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Błąd serwera" });
    }
  }

  async updateUserPassword(req: Request, res: Response) {
    try {
      const {userId, oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Brak wymaganych danych" });
      }

      const user = await this.userService.updateUserPassword(
        userId,
        oldPassword,
        newPassword,
      );

      if (!user) {
        return res.status(400).json({ message: "Nieprawidłowe hasło" });
      }

      return res.status(200).json({
        message: "Hasło zostało zmienione pomyślnie",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Wystąpił błąd podczas zmiany hasła",
        error: error instanceof Error ? error.message : "Nieznany błąd",
      });
    }
  }
}
