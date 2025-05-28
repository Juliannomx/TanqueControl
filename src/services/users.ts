import User from "../models/users";
import type { IUser } from "../models/users";
import type { CustomRequest } from "../middlewares/auth";

export const registerUser = async (user: IUser) => {
  const newUser = new User(user);
  return await newUser.save();
};

export const login = async (user: IUser) => {
  const { email, password } = user;
  const existingUser = await User.findByCredentials(email, password);
  return existingUser;
};

export const logout = async (req: CustomRequest) => {
  if (req.user) {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  }
};
