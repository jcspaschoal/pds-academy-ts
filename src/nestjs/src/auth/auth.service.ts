import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}

    async signIn(username, pass) {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
