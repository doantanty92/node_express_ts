import { EntityId } from 'typeorm/repository/EntityId';
import { DeepPartial, DeleteResult, FindOptionsWhere, ObjectId, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IBaseService<T> {
  create(data: DeepPartial<T>): Promise<T>;

  findAll(id: [EntityId]): Promise<T[]>;

  update(
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
  ): Promise<UpdateResult>;

  delete(
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
  ): Promise<DeleteResult>;
}
