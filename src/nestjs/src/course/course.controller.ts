import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
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
  ListCourseModuleUseCase,
  ListCourseUseCase,
  ListLessonUseCase,
  UpdateCourseUseCase,
} from '@pds/academy-core/course/application';
import { RolesGuard } from '../auth/guards';
import { GetCurrentUserId, Roles } from '../auth/decorators';
import { ExcludeNullInterceptor } from '../@share/interceptors/exclude-null.interceptor';
import {
  CreateCourseDto,
  CreateCourseModule,
  CreateLessonDto,
  GetLessonDto,
  SearchCourseDto,
  SearchLessonDto,
  SearchModuleDto,
  UpdateCourseDto,
} from './dto';
import {
  CourseCollectionPresenter,
  CourseModuleCollectionPresenter,
} from './presenter';

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

  @Inject(ListCourseUseCase.UseCase)
  private listCourseUseCase: ListCourseUseCase.UseCase;

  @Inject(ListLessonUseCase.UseCase)
  private listLessonUseCase: ListLessonUseCase.UseCase;

  @Inject(ListCourseModuleUseCase.UseCase)
  private listCourseModuleUseCase: ListCourseModuleUseCase.UseCase;

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('teacher')
  @UseInterceptors(ExcludeNullInterceptor)
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.createCourseUseCase.execute({
      userId: userId,
      name: createCourseDto.name,
      minScore: createCourseDto.minScore,
      description: createCourseDto.description,
    });
  }

  @Post('/module')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('teacher')
  @UseInterceptors(ExcludeNullInterceptor)
  async createCourseModule(
    @Body() createCourseModuleDto: CreateCourseModule,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.createCourseModuleUseCase.execute({
      name: createCourseModuleDto.name,
      userId: userId,
      order: createCourseModuleDto.order,
      courseId: createCourseModuleDto.courseId,
      description: createCourseModuleDto.description,
    });
  }

  @Post('/lesson')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('teacher')
  @UseInterceptors(ExcludeNullInterceptor)
  async createCourseLesson(
    @Body() createCourseLessonDto: CreateLessonDto,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.createLessonUseCase.execute({
      courseId: createCourseLessonDto.courseId,
      description: createCourseLessonDto.description,
      name: createCourseLessonDto.name,
      videoUrl: createCourseLessonDto.videoUrl,
      moduleId: createCourseLessonDto.moduleId,
      order: createCourseLessonDto.order,
      userId: userId,
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludeNullInterceptor)
  async ListCourses(
    @Param('id') courseId: string,
    @Query() searchParams: SearchCourseDto,
    @GetCurrentUserId() userId: string,
  ): Promise<CourseCollectionPresenter> {
    const output = await this.listCourseUseCase.execute(searchParams);
    return new CourseCollectionPresenter(output);
  }

  @Get('/lesson')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludeNullInterceptor)
  async ListLessons(
    @GetCurrentUserId() userId: string,
    @Body() getLessonsDto: SearchLessonDto,
  ): Promise<any> {
    const output = await this.listLessonUseCase.execute(getLessonsDto);
    return output;
  }

  @Get('/module')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludeNullInterceptor)
  async listModules(
    @GetCurrentUserId() userId: string,
    @Body() getModuleDto: SearchModuleDto,
  ): Promise<CourseModuleCollectionPresenter> {
    const output = await this.listCourseModuleUseCase.execute(getModuleDto);
    return new CourseModuleCollectionPresenter(output);
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
      courseId: courseId,
      userId: userId,
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
