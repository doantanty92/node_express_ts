import { BaseService } from './base.service';
import { User } from '@/entities/user.entity';
import AppDataSource from '@/utils/app-data-source';
import { IUserService } from './interface/user.interface';
import { UserRepository } from '@/repositories/user.repository';

export default class UserService
  extends BaseService<User, UserRepository>
  implements IUserService
{
  constructor() {
    super(AppDataSource.getRepository(User));
  }

  public async create(input: User) {
    const newUser = await this.repository.create(input);
    await this.repository.save(newUser);
    return newUser;
  }

  public async findAll() {
    const newUser = await this.repository.find();
    return newUser;
  }
}
