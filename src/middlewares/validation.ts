import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(401).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
