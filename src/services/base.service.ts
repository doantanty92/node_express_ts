import {
  BaseEntity,
  Repository,
  FindOneOptions,
  DeepPartial,
  ObjectId,
  FindOptionsWhere,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async index(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOneOrFail(options);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
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
