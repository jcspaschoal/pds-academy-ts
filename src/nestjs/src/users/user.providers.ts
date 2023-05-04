/* eslint-disable @typescript-eslint/no-namespace */

import {
  CreateAddressUseCase,
  CreateUserUseCase,
  DeactivateUserUseCase,
  DeleteAddressUseCase,
  GetAddressUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from '@pds/academy-core/user/application';
import { UserRepository } from '@pds/academy-core/user/domain';
import { UserPrisma } from '@pds/academy-core/user/infra';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../database/prisma-service.service';

export namespace USER_PROVIDERS {
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
  }

  export namespace USER_USE_CASES {
    export const CREATE_USER_USE_CASE = {
      provide: CreateUserUseCase.UseCase,
      useFactory: (repository: UserRepository.Repository) => {
        return new CreateUserUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };

    export const GET_USER_USE_CASE = {
      provide: GetUserUseCase.UseCase,
      useFactory: (repository: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };

    export const UPDATE_USER_USE_CASE = {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (repository: UserRepository.Repository) => {
        return new UpdateUserUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };
    export const DELETE_USER_USE_CASE = {
      provide: DeactivateUserUseCase.UseCase,
      useFactory: (repository: UserRepository.Repository) => {
        return new DeactivateUserUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };

    export const DELETE_ADDRESS_USE_CASE = {
      provide: DeleteAddressUseCase.UseCase,
      useFactory: (repository: UserRepository.Repository) => {
        return new DeleteAddressUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };

    export const GET_ADDRESS_USE_CASE = {
      provide: GetAddressUseCase.UseCase,
      useFactory: (repository: UserRepository.Repository) => {
        return new GetAddressUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };
    export const CREATE_ADDRESS_USE_CASE = {
      provide: CreateAddressUseCase.UseCase,
      useFactory: (repository: UserRepository.Repository) => {
        return new CreateAddressUseCase.UseCase(repository);
      },
      inject: [REPOSITORIES.USER_REPOSITORY.provide],
    };
  }
}
