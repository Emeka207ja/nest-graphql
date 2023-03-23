import {
  Injectable,
  CanActivate,
  ExecutionContext,
  createParamDecorator,
  BadGatewayException,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enum/role.enum';
import { ROLES_KEY } from './role.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const userRole = req?.user?.role
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
     return requiredRoles.some((role) => userRole?.includes(role));
  }
 
}
