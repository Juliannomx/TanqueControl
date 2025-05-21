import { z } from "zod";

export const updateReferenceValueSchema = z
  .object({
    value: z.number(),
  })
  .strict();
