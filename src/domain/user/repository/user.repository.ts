import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PromiseResult, Result } from '@leejuyoung/result';
import { UserDto } from '../dto/user.dto';
import { convertTypeOrmErrorToDataError } from '~/infrastructure/utils/repository/convertTypeOrmErrorToDataError';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { DataNotFoundError } from '~/@shared/errors/@domain/dataNotFoundError';
import { DataConflictError } from '~/@shared/errors/@domain/dataConflictError';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userOrmRepository: Repository<UserEntity>,
  ) {}

  async findOne(
    findData: FindOptionsWhere<UserEntity>,
  ): PromiseResult<UserDto, DataNotFoundError> {
    return Result.of(
      this.userOrmRepository
        .findOneByOrFail(findData)
        .then((entity) => {
          return entity.toDto();
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'user');
        }),
    );
  }

  async create(
    data: DeepPartial<UserDto>,
  ): PromiseResult<UserDto, DataConflictError> {
    return Result.of(
      this.userOrmRepository
        .save(
          this.userOrmRepository.create({
            email: data.email,
            passwordHash: data.passwordHash,
          }),
        )
        .then((entity) => {
          return entity.toDto();
        })
        .catch((e) => {
          throw convertTypeOrmErrorToDataError(e, 'user');
        }),
    );
  }
}
