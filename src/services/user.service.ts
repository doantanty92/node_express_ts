import AppDataSource from '@/utils/app-data-source';
import { User } from '@/entities/user.entity';
import { BaseService } from '@/services/base.service';
import { CreateUserInput } from '@/schemas/user.schema';
import { sendVerifyToken } from '@/utils/mail';

export default class UserService extends BaseService<User> {
  constructor() {
    const repo = AppDataSource.getRepository(User);
    super(repo);
  }

  async createUser(input: CreateUserInput) {
    const user = {
      ...input,
      confirmationToken: User.genConfirmationToken(),
      confirmTokenSendAt: new Date(),
    };

    const newUser = await this.create(user);
    await sendVerifyToken(newUser.email, newUser.confirmationToken);
    return newUser;
  }

  async verifyEmail(token: string) {
    const user = await this.findOne({
      where: {
        confirmationToken: token,
      },
    });

    if (!user) {
      throw new Error('Invalid token');
    }

    user.isActivated = true;
    user.isConfirmed = true;
    user.confirmationToken = '';
    await this.update(user.id, user);
  }
}
