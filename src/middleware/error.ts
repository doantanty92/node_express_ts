import { NextFunction, Request, Response } from 'express';

import ApiResponse from '@/utils/api-response';
import { Error } from '@/types/error';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const httpCode = err.statusCode || 500;
  return ApiResponse.error(res, err, httpCode);
};
