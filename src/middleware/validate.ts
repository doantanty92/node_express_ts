import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = validated.body;
      req.query = validated.query;
      req.params = validated.params;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map(({ code, message, path }) => ({
          code,
          message,
          field: path[1],
        }));
        res.status(400).json({
          code: 'validation_error',
          errors,
          success: false,
        });
        return;
      }

      next(error);
    }
  };
