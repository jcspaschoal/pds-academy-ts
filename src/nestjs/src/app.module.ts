import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareModule } from './@share/@share.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ExamModule } from './exam/exam.module';
import { InscriptionModule } from './inscription/inscription.module';

@Module({
  imports: [
    ShareModule,
    UsersModule,
    DatabaseModule,
    ConfigModule,
    AuthModule,
    CourseModule,
    ExamModule,
    InscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
