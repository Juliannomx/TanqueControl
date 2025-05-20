import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export const loginUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();
