import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { USER_PROVIDERS } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.USER_USE_CASES),
  ],
})
export class UsersModule {}
