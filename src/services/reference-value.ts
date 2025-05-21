import ReferenceValue from "../models/reference-value";
import type { IReferenceValue } from "../models/reference-value";

export const updateReferenceValue = async (data: IReferenceValue) => {
  const referenceValue = new ReferenceValue(data);
  return await referenceValue.save();
};

export const getReferenceValue = async () =>
  await ReferenceValue.getReferenceValue();
