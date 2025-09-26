import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    const z = err as ZodError;
    return res.status(400).json({ success: false, message: "Validation error", errors: z.flatten() });
  }
};
