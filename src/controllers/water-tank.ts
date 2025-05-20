import type { Request, Response, NextFunction } from "express";
import * as waterTankService from "../services/water-tank";

export const createWaterTankEntry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const entry = await waterTankService.createWaterTankEntry(req.body);
    res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
};

export const getWaterTankEntries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const entries = await waterTankService.getWaterTankEntries();
    res.status(200).json(entries);
  } catch (e) {
    next(e);
  }
};
