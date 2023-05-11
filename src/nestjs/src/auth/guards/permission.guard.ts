// permissions.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required permissions from the metadata set by the permissions decorator
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) {
      // If no permissions are required, allow access
      return true;
    }

    // Get the request object from the context
    const request = context.switchToHttp().getRequest();

    // Extract the JWT token from the request headers
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      // If no token is present, deny access
      return false;
    }

    try {
      // Verify and decode the JWT token
      const decoded = this.jwtService.verify(token);

      // Check if the decoded user has the required permissions
      return requiredPermissions.every((permission) =>
        (decoded as { permissions: string[] }).permissions.includes(permission),
      );
    } catch {
      // If token is invalid, deny access
      return false;
    }
  }
}
