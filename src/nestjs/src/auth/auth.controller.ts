import {Body, Controller, Post, HttpCode, HttpStatus, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthDto} from "./dto";
import {GetCurrentUserId, Public, GetCurrentUser} from "./decorators";
import {Tokens} from "./types/tokens.type";
import {RtGuard} from "./guards";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    signIn(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signIn(dto.email, dto.password);
    }

}