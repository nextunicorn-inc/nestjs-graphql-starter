import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BaseDataloaderDelegate } from '~/interfaces/@dataloader/baseDataloader.delegate';
import { GqlExecutionContext } from '@nestjs/graphql';

export const DataLoad: (
  delegate: new (...args: any[]) => BaseDataloaderDelegate<any, any>,
) => ParameterDecorator = createParamDecorator(
  (
    delegateClass: typeof BaseDataloaderDelegate<any, any>,
    ctx: ExecutionContext,
  ) => {
    const gqlExecutionContext = GqlExecutionContext.create(ctx);
    return gqlExecutionContext.getContext().getDataLoader(delegateClass);
  },
);
