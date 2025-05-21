import type { Request, Response, NextFunction } from "express";
import type { CustomRequest } from "../middlewares/auth";
import * as referenceValueService from "../services/reference-value";

export const updateReferenceValue = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.body["modifiedBy"] = req.user;
    const entry = await referenceValueService.updateReferenceValue(req.body);
    res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
};

export const getReferenceValue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const entries = await referenceValueService.getReferenceValue();
    res.status(200).json(entries);
  } catch (e) {
    next(e);
  }
};
