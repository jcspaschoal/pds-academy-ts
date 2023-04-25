import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ShareModule} from './@share/@share.module';
import {UsersModule} from './users/users.module';
import {DatabaseModule} from './database/database.module';
import {ConfigModule} from './config/config.module';
import {AuthModule} from './auth/auth.module';

@Module({
    imports: [ShareModule, UsersModule, DatabaseModule, ConfigModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
