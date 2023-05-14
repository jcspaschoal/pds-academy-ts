/* eslint-disable @typescript-eslint/no-namespace */

import { PrismaClient } from '@prisma/client';
import { ExamPrisma } from '@pds/academy-core/exam/infra';
import { PrismaService } from '../database/prisma-service.service';
import {
  CreateUserExamUseCase,
  GetExam,
  GetLastUserExam,
} from '@pds/academy-core/exam/application';
import { ExamRepository } from '@pds/academy-core/exam/domain';

export namespace EXAM_PROVIDERS {
  export namespace REPOSITORIES {
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
  export namespace EXAM_USE_CASES {
    export const CREATE_USER_EXAM = {
      provide: CreateUserExamUseCase.UseCase,
      useFactory: (repository: ExamRepository.Repository) => {
        return new CreateUserExamUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.EXAM_PRISMA_REPOSITORY.provide],
    };

    export const GET_EXAM = {
      provide: GetExam.UseCase,
      useFactory: (repository: ExamRepository.Repository) => {
        return new GetExam.UseCase(repository);
      },
      inject: [REPOSITORIES.EXAM_PRISMA_REPOSITORY.provide],
    };

    export const GET_LAST_USER_EXAM = {
      provide: GetLastUserExam.UseCase,
      useFactory: (repository: ExamRepository.Repository) => {
        return new GetLastUserExam.UseCase(repository);
      },
      inject: [REPOSITORIES.EXAM_PRISMA_REPOSITORY.provide],
    };
  }
}
