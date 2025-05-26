import { z } from "zod";

export const createWaterTankEntrySchema = z
  .object({
    waterLevel: z.number(),
    inflow: z.number(),
    outflow: z.number(),
  })
  .strict();
