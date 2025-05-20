import User from "../models/users";
import type { IUser } from "../models/users";

export const registerUser = async (user: IUser) => {
  const newUser = new User(user);
  return await newUser.save();
};

export const login = async (user: IUser) => {
  const { email, password } = user;
  const existingUser = await User.findByCredentials(email, password);
  return existingUser;
};
