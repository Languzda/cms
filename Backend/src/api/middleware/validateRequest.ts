import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Błąd walidacji",
      errors: errors.array().map((err) => ({
        field: err.type,
        message: err.msg,
      })),
    });
    return;
  }
  next();
};
