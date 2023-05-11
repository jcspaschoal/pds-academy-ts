/* eslint-disable @typescript-eslint/no-namespace */

import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../database/prisma-service.service';
import { InscriptionPrisma } from '@pds/academy-core/inscription/infra';
import {
  CreateInscriptionUseCase,
  GetInscriptionUseCase,
  ListInscriptionUseCase,
  UploadFileUseCase,
  BulkStatusUpdateUseCase,
  FindInscriptionByInscriptionIdUseCase,
} from '@pds/academy-core/inscription/application';
import { InscriptionRepository } from '@pds/academy-core/inscription/domain';

export namespace INSCRIPTION_PROVIDERS {
  export namespace REPOSITORIES {
    export const INSCRIPTION_PRISMA_REPOSITORY = {
      provide: 'InscriptionPrismaRepository',
      useFactory: (prisma: PrismaClient) => {
        return new InscriptionPrisma.InscriptionPrismaRepository(prisma);
      },
      inject: [PrismaService],
    };

    export const INSCRIPTION_REPOSITORY = {
      provide: 'InscriptionRepository',
      useExisting: 'InscriptionPrismaRepository',
    };
  }

  export namespace INSCRIPTION_USE_CASES {
    export const CREATE_USER_USE_CASE = {
      provide: CreateInscriptionUseCase.UseCase,
      useFactory: (repository: InscriptionRepository.Repository) => {
        return new CreateInscriptionUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.INSCRIPTION_REPOSITORY.provide],
    };

    export const GET_INSCRIPTION_USE_CASE = {
      provide: GetInscriptionUseCase.UseCase,
      useFactory: (repository: InscriptionRepository.Repository) => {
        return new GetInscriptionUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.INSCRIPTION_REPOSITORY.provide],
    };

    export const LIST_INSCRIPTION_USE_CASE = {
      provide: ListInscriptionUseCase.UseCase,
      useFactory: (repository: InscriptionRepository.Repository) => {
        return new ListInscriptionUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.INSCRIPTION_REPOSITORY.provide],
    };

    export const UPDATE_INSCRIPTION_USE_CASE = {
      provide: UploadFileUseCase.UseCase,
      useFactory: (repository: InscriptionRepository.Repository) => {
        return new UploadFileUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.INSCRIPTION_REPOSITORY.provide],
    };

    export const FIND_INSCRIPTION_BY_INSCRIPTION_ID_USE_CASE = {
      provide: FindInscriptionByInscriptionIdUseCase.UseCase,
      useFactory: (repository: InscriptionRepository.Repository) => {
        return new FindInscriptionByInscriptionIdUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.INSCRIPTION_REPOSITORY.provide],
    };

    export const BULK_UPDATE_USE_CASE = {
      provide: BulkStatusUpdateUseCase.UseCase,
      useFactory: (repository: InscriptionRepository.Repository) => {
        return new BulkStatusUpdateUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.INSCRIPTION_REPOSITORY.provide],
    };
  }
}
