import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { COURSE_PROVIDERS } from './course.providers';
import { CourseController } from './course.controller';
@Module({
  imports: [DatabaseModule],
  providers: [
    ...Object.values(COURSE_PROVIDERS.REPOSITORIES),
    ...Object.values(COURSE_PROVIDERS.COURSE_USE_CASES),
  ],
  controllers: [CourseController],
})
export class CourseModule {}
