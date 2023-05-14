import { NextFunction, Request, Response } from 'express';

import { toUser } from '@/mappers/auth.mapper';
import { IUserService } from '@/services/interface/user.interface';
import ApiResponse from '@/utils/api-response';

export default class AuthController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.register = this.register.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body;
      console.log({input})
      const user = await this.userService.create(input);

      return ApiResponse.success(res, {
        data: toUser(user),
      });
    } catch (error: any) {
      next(error);
    }
  }
}
