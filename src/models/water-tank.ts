import { Schema, model } from "mongoose";
import type { Model, Document, ObjectId } from "mongoose";

import ReferenceValue from "./reference-value";

export interface IWaterTank extends Document {
  waterLevel: number;
  inflow: number;
  outflow: number;
  referenceValue: Schema.Types.ObjectId;
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
    referenceValue: {
      type: Schema.Types.ObjectId,
      ref: ReferenceValue,
    },
  },
  { timestamps: true },
);

waterTankSchema.pre("save", async function (next) {
  const referenceValue = await ReferenceValue.getReferenceValue();
  if (!referenceValue) throw new Error("No Reference Value");
  this.referenceValue = referenceValue._id as ObjectId;

  next();
});

const WaterTank = model<IWaterTank, WaterTankModel>(
  "water_tank",
  waterTankSchema,
);

export default WaterTank;
