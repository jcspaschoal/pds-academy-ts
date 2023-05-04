import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '@pds/academy-core/user/infra';
import { GetUserUseCase } from '@pds/academy-core/user/application';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase;

  constructor(private jwtService: JwtService) {}

  async signIn(email: string, password: string) {
    const user = await this.getUserUseCase.execute({ email });
    if (!(await comparePassword(password, user?.password))) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = {
      sub: user.id,
      permissions: user.group.value.permissions,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
