import * as DataLoader from 'dataloader';

export abstract class BaseDataloaderDelegate<Key extends number | string, DTO> {
  newInst(): DataLoader<Key, DTO> {
    return new DataLoader<Key, DTO>((keys) => {
      return this.batchLoad(keys)
        .then((map) => {
          return keys.map((key) => map[key]);
        })
        .catch((error) => error);
    });
  }

  abstract batchLoad(keys: readonly Key[]): Promise<Record<Key, DTO>>;
}
