import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  CreateUserExamUseCase,
  GetExam,
  GetLastUserExam,
} from '@pds/academy-core/exam/application';
import { ExamPresenter } from './presenter';
import { GetCurrentUserId } from '../auth/decorators';
import { UserExamDto } from './dto';
import { UserExamPresenter } from './presenter';

@Controller('exam')
export class ExamController {
  @Inject(GetExam.UseCase)
  private getExamUseCase: GetExam.UseCase;

  @Inject(CreateUserExamUseCase.UseCase)
  private createUserExamUseCase: CreateUserExamUseCase.UseCase;

  @Inject(GetLastUserExam.UseCase)
  private getLastUserExamUseCase: GetLastUserExam.UseCase;

  @Get()
  @HttpCode(HttpStatus.OK)
  async getExam() {
    const output = await this.getExamUseCase.execute();
    return new ExamPresenter(output);
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getLastExam(@GetCurrentUserId() userId: string) {
    const output = await this.getLastUserExamUseCase.execute({
      userId: userId,
    });
    return new UserExamPresenter(output);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async submitUserExam(
    @GetCurrentUserId() userId: string,
    @Body() createUserExam: UserExamDto,
  ) {
    const output = await this.createUserExamUseCase.execute({
      examId: createUserExam.exam_id,
      userId: userId,
      answeredQuestions: createUserExam.questions.map((question) => {
        return {
          questionNumber: question.number,
          questionAnswer: question.answer,
        };
      }),
    });
    return new UserExamPresenter(output);
  }
}
