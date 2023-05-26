/* eslint-disable @typescript-eslint/no-namespace */

import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../database/prisma-service.service';
import {
  CourseModulePrisma,
  CoursePrisma,
  LessonPrisma,
} from '@pds/academy-core/course/infra';

import {
  CourseModuleRepository,
  CourseRepository,
  LessonRepository,
} from '@pds/academy-core/course/domain';
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
import { UserRepository } from '@pds/academy-core/user/domain';
import { UserPrisma } from '@pds/academy-core/user/infra';
import { ExamPrisma } from '@pds/academy-core/exam/infra';
import { ExamRepository } from '@pds/academy-core/exam/domain';

export namespace COURSE_PROVIDERS {
  export namespace REPOSITORIES {
    export const USER_PRISMA_REPOSITORY = {
      provide: 'UserPrismaRepository',
      useFactory: (prisma: PrismaClient) => {
        return new UserPrisma.UserRepository(prisma);
      },
      inject: [PrismaService],
    };

    export const USER_REPOSITORY = {
      provide: 'UserRepository',
      useExisting: 'UserPrismaRepository',
    };

    export const COURSE_PRISMA_REPOSITORY = {
      provide: 'CoursePrismaRepository',
      useFactory: (prisma: PrismaClient) => {
        return new CoursePrisma.CoursePrismaRepository(prisma);
      },
      inject: [PrismaService],
    };

    export const COURSE_REPOSITORY = {
      provide: 'CourseRepository',
      useExisting: 'CoursePrismaRepository',
    };

    export const COURSE_MODULE_PRISMA_REPOSITORY = {
      provide: 'CourseModulePrismaRepository',
      useFactory: (prisma: PrismaClient) => {
        return new CourseModulePrisma.CourseModulePrismaRepository(prisma);
      },
      inject: [PrismaService],
    };

    export const COURSE_MODULE_REPOSITORY = {
      provide: 'CourseModuleRepository',
      useExisting: 'CourseModulePrismaRepository',
    };

    export const LESSON_PRISMA_REPOSITORY = {
      provide: 'LessonPrismaRepository',
      useFactory: (prisma: PrismaClient) => {
        return new LessonPrisma.LessonPrismaRepository(prisma);
      },
      inject: [PrismaService],
    };

    export const LESSON_REPOSITORY = {
      provide: 'LessonRepository',
      useExisting: 'LessonPrismaRepository',
    };

    export const EXAM_PRISMA_REPOSITORY = {
      provide: 'ExamPrismaRepository',
      useFactory: (prisma: PrismaClient) => {
        return new ExamPrisma.ExamRepository(prisma);
      },
      inject: [PrismaService],
    };
    export const EXAM_REPOSITORY = {
      provide: 'ExamRepository',
      useExisting: 'ExamPrismaRepository',
    };
  }

  export namespace COURSE_USE_CASES {
    export const CREATE_USER_USE_CASE = {
      provide: CreateCourseUseCase.UseCase,
      useFactory: (
        repository: CourseRepository.Repository,
        userRepository: UserRepository.Repository,
      ) => {
        return new CreateCourseUseCase.UseCase(repository, userRepository);
      },
      inject: [
        REPOSITORIES.COURSE_REPOSITORY.provide,
        REPOSITORIES.USER_REPOSITORY.provide,
      ],
    };

    export const CREATE_MODULE_USE_CASE = {
      provide: CreateCourseModuleUseCase.UseCase,
      useFactory: (
        repository: CourseModuleRepository.Repository,
        courseRepository: CourseRepository.Repository,
      ) => {
        return new CreateCourseModuleUseCase.UseCase(
          repository,
          courseRepository,
        );
      },
      inject: [
        REPOSITORIES.COURSE_MODULE_REPOSITORY.provide,
        REPOSITORIES.COURSE_REPOSITORY.provide,
      ],
    };

    export const CREATE_LESSON_USE_CASE = {
      provide: CreateLesson.UseCase,
      useFactory: (
        courseRepository: CourseRepository.Repository,
        courseModuleRepository: CourseModuleRepository.Repository,
        repository: LessonRepository.Repository,
      ) => {
        return new CreateLesson.UseCase(
          courseRepository,
          courseModuleRepository,
          repository,
        );
      },
      inject: [
        REPOSITORIES.COURSE_REPOSITORY.provide,
        REPOSITORIES.COURSE_MODULE_REPOSITORY.provide,
        REPOSITORIES.LESSON_REPOSITORY.provide,
      ],
    };

    export const LIST_COURSE_USE_CASE = {
      provide: ListCourseUseCase.UseCase,
      useFactory: (courseRepository: CourseRepository.Repository) => {
        return new ListCourseUseCase.UseCase(courseRepository);
      },
      inject: [REPOSITORIES.COURSE_REPOSITORY.provide],
    };

    export const LIST_COURSE_MODULE_USE_CASE = {
      provide: ListCourseModuleUseCase.UseCase,
      useFactory: (
        courseModuleRepository: CourseModuleRepository.Repository,
      ) => {
        return new ListCourseModuleUseCase.UseCase(courseModuleRepository);
      },
      inject: [REPOSITORIES.COURSE_MODULE_REPOSITORY.provide],
    };

    export const LIST_LESSON_USE_CASE = {
      provide: ListLessonUseCase.UseCase,
      useFactory: (
        courseRepository: CourseRepository.Repository,
        courseModuleRepository: CourseModuleRepository.Repository,
        repository: LessonRepository.Repository,
      ) => {
        return new ListLessonUseCase.UseCase(
          courseRepository,
          courseModuleRepository,
          repository,
        );
      },
      inject: [
        REPOSITORIES.COURSE_REPOSITORY.provide,
        REPOSITORIES.COURSE_MODULE_REPOSITORY.provide,
        REPOSITORIES.LESSON_REPOSITORY.provide,
      ],
    };

    export const JOIN_COURSE_USE_CASE = {
      provide: JoinCourseUseCase.UseCase,
      useFactory: (
        courseRepository: CourseRepository.Repository,
        examRepository: ExamRepository.Repository,
      ) => {
        return new JoinCourseUseCase.UseCase(courseRepository, examRepository);
      },
      inject: [
        REPOSITORIES.COURSE_REPOSITORY.provide,
        REPOSITORIES.EXAM_REPOSITORY.provide,
      ],
    };

    export const LEAVE_COURSE_USE_CASE = {
      provide: LeaveCourseUseCase.UseCase,
      useFactory: (courseRepository: CourseRepository.Repository) => {
        return new LeaveCourseUseCase.UseCase(courseRepository);
      },
      inject: [REPOSITORIES.COURSE_REPOSITORY.provide],
    };

    export const DELETE_COURSE_USE_CASE = {
      provide: DeleteCourseUseCase.UseCase,
      useFactory: (courseRepository: CourseRepository.Repository) => {
        return new DeleteCourseUseCase.UseCase(courseRepository);
      },
      inject: [REPOSITORIES.COURSE_REPOSITORY.provide],
    };

    export const UPDATE_COURSE_USE_CASE = {
      provide: UpdateCourseUseCase.UseCase,
      useFactory: (courseRepository: CourseRepository.Repository) => {
        return new UpdateCourseUseCase.UseCase(courseRepository);
      },
      inject: [REPOSITORIES.COURSE_REPOSITORY.provide],
    };
  }
}
