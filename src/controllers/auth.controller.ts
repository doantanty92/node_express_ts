import { NextFunction, Request, Response } from 'express';

import UserService from '@/services/user.service';
import { CreateUserInput, VerifyUserInput } from '@/schemas/user.schema';
import { PG_CONSTRAINT, HTTP_CODE } from '@/constants/common';
import { toUser } from '@/mappers/auth.mapper';
import ApiResponse from '@/utils/api-response';

export default class AuthController {
  protected userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.register = this.register.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const input: CreateUserInput = req.body;
      const user = await this.userService.createUser(input);
      return ApiResponse.success(res, {
        data: toUser(user),
      });
    } catch (error: any) {
      if (error.code === PG_CONSTRAINT.UNIQUE_VIOLATION) {
        return next({
          statusCode: HTTP_CODE.BAD_REQUEST,
          message: 'Email already exists',
        });
      }

      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.query as VerifyUserInput;
      await this.userService.verifyEmail(token);
      const data = {
        message: 'Email verified successfully',
      };
      return ApiResponse.success(res, { data });
    } catch (error: any) {
      next(error);
    }
  }
}
