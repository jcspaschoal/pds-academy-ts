import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @HttpCode(HttpStatus.OK)
    @Post('Login')
    signIn(@Body() signInDto: Record<string, any>) {

    }
}
