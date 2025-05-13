import WaterTank from "../models/water-tank";

export const getWaterTankEntries = async () => {
  const waterTankEntries = await WaterTank.find().sort({ createdAt: -1 });
  return waterTankEntries;
};

export const createWaterTankEntry = async (data: object) => {
  const waterTankEntry = new WaterTank(data);
  return await waterTankEntry.save();
};
