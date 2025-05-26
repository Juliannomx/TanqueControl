import WaterTank from "../models/water-tank";
import type { IWaterTank } from "../models/water-tank";
import { paginationPipeline } from "../helpers/paginationPipeline";

export const getWaterTankEntries = async ({ page = "1", pageSize = "10" }) => {
  const waterTankEntries = await WaterTank.aggregate(
    paginationPipeline<IWaterTank>(page, Number(pageSize)),
  );
  return waterTankEntries;
};

export const createWaterTankEntry = async (data: object) => {
  const waterTankEntry = new WaterTank(data);
  return await waterTankEntry.save();
};
