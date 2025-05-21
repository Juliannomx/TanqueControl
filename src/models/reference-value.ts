import {
  type Document,
  type Model,
  Schema,
  model,
  HydratedDocument,
} from "mongoose";
import User from "./users";

export interface IReferenceValue extends Document {
  value: number;
  modifiedBy: Schema.Types.ObjectId;
}

interface ReferenceValueModel extends Model<IReferenceValue, object, object> {
  getReferenceValue(): Promise<HydratedDocument<IReferenceValue>>;
}

const referenceValueSchema = new Schema<
  IReferenceValue,
  object,
  ReferenceValueModel
>(
  {
    value: {
      type: Number,
      required: true,
    },
    modifiedBy: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true },
);

referenceValueSchema.statics.getReferenceValue = async () => {
  const referenceValue = await ReferenceValue.findOne().sort({ createdAt: -1 });
  if (!referenceValue) throw new Error("No Data");
  return referenceValue;
};

const ReferenceValue = model<IReferenceValue, ReferenceValueModel>(
  "reference_value",
  referenceValueSchema,
);

export default ReferenceValue;
