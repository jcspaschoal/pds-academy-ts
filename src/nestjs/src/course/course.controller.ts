import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateCourseModuleUseCase,
  CreateCourseUseCase,
  CreateLesson,
  JoinCourseUseCase,
} from '@pds/academy-core/course/application';
import { RolesGuard } from '../auth/guards';
import { GetCurrentUserId, Roles } from '../auth/decorators';
import { ExcludeNullInterceptor } from '../@share/interceptors/exclude-null.interceptor';
import { CreateCourseDtoDto } from './dto';

@Controller('/course')
export class CourseController {
  @Inject(CreateCourseUseCase.UseCase)
  private createCourseUseCase: CreateCourseUseCase.UseCase;

  @Inject(CreateCourseModuleUseCase.UseCase)
  private createCourseModuleUseCase: CreateCourseModuleUseCase.UseCase;

  @Inject(CreateLesson.UseCase)
  private createLessonUseCase: CreateLesson.UseCase;

  @Inject(JoinCourseUseCase.UseCase)
  private joinCourseUseCase: JoinCourseUseCase.UseCase;

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('teacher')
  @UseInterceptors(ExcludeNullInterceptor)
  async createCourse(
    @Body() createCourseDto: CreateCourseDtoDto,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.createCourseUseCase.execute({
      userId: userId,
      name: createCourseDto.name,
      minScore: createCourseDto.minScore,
      description: createCourseDto.description,
    });
  }
  @Post('/join/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('teacher')
  @UseInterceptors(ExcludeNullInterceptor)
  async asyncCourse(
    @GetCurrentUserId() userId: string,
    @Param('id') courseId: string,
  ): Promise<void> {
    await this.joinCourseUseCase.execute({
      userId,
      courseId,
    });
  }
}
