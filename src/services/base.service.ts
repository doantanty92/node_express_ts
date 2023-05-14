import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  ObjectId,
  Repository,
  UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IBaseService } from './interface/i.base.service';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(data);
  }

  async update(
    criteria:
      | string
      | number
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[]
      | FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    return await this.repository.update(criteria, data);
  }

  async delete(
    criteria:
      | string
      | number
      | Date
      | ObjectId
      | string[]
      | number[]
      | Date[]
      | ObjectId[]
      | FindOptionsWhere<T>
  ): Promise<DeleteResult> {
    return await this.repository.delete(criteria);
  }
}
