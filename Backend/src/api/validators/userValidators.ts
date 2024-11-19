import { body } from "express-validator";

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Podaj prawidłowy adres email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Hasło musi mieć minimum 6 znaków")
    .matches(/\d/)
    .withMessage("Hasło musi zawierać przynajmniej jedną cyfrę")
    .matches(/[A-Z]/)
    .withMessage("Hasło musi zawierać przynajmniej jedną wielką literę"),

  body("username")
    .isLength({ min: 3 })
    .withMessage("Nazwa użytkownika musi mieć minimum 3 znaki")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia"
    ),
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Podaj prawidłowy adres email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Hasło jest wymagane"),
];
