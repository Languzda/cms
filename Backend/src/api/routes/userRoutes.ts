import { Router } from "express";
import { UserController } from "../../controllers/userController";
import { Request, Response } from "express";
import {
  registerValidator,
  loginValidator,
} from "../validators/userValidators";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();
const userController = new UserController();

router.post(
  "/register",
  registerValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    await userController.register(req, res);
  }
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    await userController.login(req, res);
  }
);

router.put("/change-password", async (req: Request, res: Response) => {
    await userController.updateUserPassword(req, res);
});

export default router;
