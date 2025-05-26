import { Schema, model } from "mongoose";
import type { Model, Document } from "mongoose";

export interface IWaterTank extends Document {
  waterLevel: number;
  inflow: number;
  outflow: number;
}

type WaterTankModel = Model<IWaterTank, object, object>;

const waterTankSchema = new Schema<IWaterTank, WaterTankModel, object>(
  {
    waterLevel: {
      type: Number,
      required: true,
    },
    inflow: {
      type: Number,
      required: true,
    },
    outflow: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const WaterTank = model<IWaterTank, WaterTankModel>(
  "water_tank",
  waterTankSchema,
);

export default WaterTank;
