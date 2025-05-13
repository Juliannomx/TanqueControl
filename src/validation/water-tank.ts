import { z } from "zod";

export const createWaterTankEntrySchema = z
  .object({
    water_level: z.number(),
    inflow: z.number(),
    outflow: z.number(),
  })
  .strict();
