import { Router } from "express";
import { validateSchema } from "../middlewares/validation";
import auth from "../middlewares/auth";
import * as referenceValueControllers from "../controllers/reference-value";
import * as referenceValueValidations from "../validation/reference-value";

const router = Router();

router.post(
  "/",
  auth,
  validateSchema(referenceValueValidations.updateReferenceValueSchema),
  referenceValueControllers.updateReferenceValue,
);
router.get("/", referenceValueControllers.getReferenceValue);

export default router;
