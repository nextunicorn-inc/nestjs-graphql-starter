import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleType } from '~/@shared/enums/roleType';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from '~/interfaces/@guard/rolesGuard';
import { GqlAuthGuard } from '~/interfaces/@guard/GqlAuthGuard';

export function Authed(roles: RoleType[]): MethodDecorator {
  return applyDecorators(
    SetMetadata('roles', roles || []),
    UseGuards(GqlAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
