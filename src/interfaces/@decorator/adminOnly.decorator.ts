import { RoleType } from '~/@shared/enums/roleType';
import { Authed } from '~/interfaces/@decorator/authed.decorator';

export function AdminOnly(): MethodDecorator {
  return Authed([RoleType.ADMIN]);
}
