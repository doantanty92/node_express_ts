import { Response } from 'express';

import { HTTP_CODE } from '@/constants/common';
import { Error } from '@/types/error';
import { Pagination } from '@/types/pagination';

export default class ApiResponse {
  static success(
    res: Response,
    {
      data,
      pagination,
    }: {
      data: any;
      pagination?: Pagination;
    },
    code: HTTP_CODE = HTTP_CODE.OK
  ): Response {
    return res.status(code).json({
      success: true,
      data,
      pagination,
    });
  }

  static error(
    res: Response,
    { message, code, errors }: Partial<Error>,
    httpCode: HTTP_CODE = HTTP_CODE.BAD_REQUEST
  ) {
    return res.status(httpCode).json({
      success: false,
      message,
      code,
      errors,
    });
  }
}
