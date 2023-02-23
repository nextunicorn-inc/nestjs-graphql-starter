import { UserDto } from '~/domain/user/dto/user.dto';
import { BaseDataloaderDelegate } from '~/interfaces/@dataloader/baseDataloader.delegate';
import { Injectable } from '@nestjs/common';
import { UserFacade } from '~/application/user/user.facade';

@Injectable()
export class UserDataloaderDelegate extends BaseDataloaderDelegate<
  number,
  UserDto
> {
  constructor(private readonly userFacade: UserFacade) {
    super();
  }

  batchLoad(keys: number[]): Promise<Record<number, UserDto>> {
    return this.userFacade
      .findMany(keys)
      .then((v) => {
        return v.getOrThrow();
      })
      .then((arr) => arr.associateBy((each) => each.id));
  }
}
