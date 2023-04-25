import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {jwtConstants} from './constants';
import {AtGuard} from "src/auth/guards";
import {APP_GUARD} from "@nestjs/core";
import {USER_PROVIDERS} from "./auth.providers";
import {DatabaseModule} from "src/database/database.module";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '2h'},
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy,
        ...Object.values(USER_PROVIDERS.REPOSITORIES),
        ...Object.values(USER_PROVIDERS.USER_USE_CASES),
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}