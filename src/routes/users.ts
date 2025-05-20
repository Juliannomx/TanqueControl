import { Router } from "express";
import { validateSchema } from "../middlewares/validation";
import * as usersController from "../controllers/users";
import * as usersValidation from "../validation/users";

const router = Router();

router.post(
  "/",
  validateSchema(usersValidation.createUserSchema),
  usersController.registerUser,
);
router.post(
  "/login",
  validateSchema(usersValidation.loginUserSchema),
  usersController.login,
);

export default router;
