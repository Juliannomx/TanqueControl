import { Router } from "express";
import { validateSchema } from "../middlewares/validation";
import * as waterTankController from "../controllers/water-tank";
import * as waterTankValidation from "../validation/water-tank";

const router = Router();

router.post(
  "/",
  validateSchema(waterTankValidation.createWaterTankEntrySchema),
  waterTankController.createWaterTankEntry,
);
router.get("/", waterTankController.getWaterTankEntries);

export default router;
