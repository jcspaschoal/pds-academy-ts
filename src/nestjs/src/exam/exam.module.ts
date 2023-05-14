import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExamController } from './exam.controller';
import { EXAM_PROVIDERS } from './exam.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...Object.values(EXAM_PROVIDERS.REPOSITORIES),
    ...Object.values(EXAM_PROVIDERS.EXAM_USE_CASES),
  ],
  controllers: [ExamController],
})
export class ExamModule {}
