import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateCourseModuleUseCase,
  CreateCourseUseCase,
  CreateLesson,
  DeleteCourseUseCase,
  JoinCourseUseCase,
  LeaveCourseUseCase,
  UpdateCourseUseCase,
} from '@pds/academy-core/course/application';
import { RolesGuard } from '../auth/guards';
import { GetCurrentUserId, Roles } from '../auth/decorators';
import { ExcludeNullInterceptor } from '../@share/interceptors/exclude-null.interceptor';
import { CreateCourseDtoDto, UpdateCourseDto } from './dto';

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

  @Inject(LeaveCourseUseCase.UseCase)
  private leaveCourseUseCase: LeaveCourseUseCase.UseCase;

  @Inject(DeleteCourseUseCase.UseCase)
  private deleteCourseUseCase: DeleteCourseUseCase.UseCase;

  @Inject(UpdateCourseUseCase.UseCase)
  private updateCourseUseCase: UpdateCourseUseCase.UseCase;

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

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('teacher')
  @UseInterceptors(ExcludeNullInterceptor)
  async deleteCourse(
    @Param('id') courseId: string,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.deleteCourseUseCase.execute({
      courseId,
      userId,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('teacher')
  @UseInterceptors(ExcludeNullInterceptor)
  async updateCourse(
    @Param('id') courseId: string,
    @GetCurrentUserId() userId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<void> {
    await this.updateCourseUseCase.execute({
      courseId,
      userId,
      minScore: updateCourseDto.minScore,
      description: updateCourseDto.description,
      name: updateCourseDto.name,
    });
  }

  @Post('/join/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludeNullInterceptor)
  async joinCourse(
    @GetCurrentUserId() userId: string,
    @Param('id') courseId: string,
  ): Promise<void> {
    await this.joinCourseUseCase.execute({
      userId,
      courseId,
    });
  }

  @Delete('/join/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludeNullInterceptor)
  async leaveCourse(
    @GetCurrentUserId() userId: string,
    @Param('id') courseId: string,
  ): Promise<void> {
    await this.leaveCourseUseCase.execute({
      userId,
      courseId,
    });
  }
}
