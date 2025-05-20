import {
  type Document,
  type Model,
  Schema,
  model,
  HydratedDocument,
} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config/config";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  tokens: { token: string }[];
}

export interface IUserMethods {
  generateAuthToken(): Promise<string>;
  toJSON(): IUser;
}

interface UserModel extends Model<IUser, object, IUserMethods> {
  findByCredentials(
    email: string,
    password: string,
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id as string }, config.jwtKey);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this as IUser;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not Found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("User not Found");
  return user;
};

const User = model<IUser, UserModel>("user", userSchema);

export default User;
