import type { Request, Response, NextFunction } from "express";
import * as usersService from "../services/users";
import { CustomRequest } from "../middlewares/auth";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await usersService.registerUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await usersService.login(req.body);
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (e) {
    next(e);
  }
};

export const logout = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await usersService.logout(req);
    res.status(201).json({ message: "User logged out successfully." });
  } catch (e) {
    next(e);
  }
};
