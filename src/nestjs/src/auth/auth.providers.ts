/* eslint-disable @typescript-eslint/no-namespace */

import { Inject } from '@nestjs/common';
import {
    CreateUserUserCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
} from '@pds/academy-core/src/user/application';
import { UserRepository } from '@pds/academy-core/src/user/domain';
import { UserPrisma } from '@pds/academy-core/src/user/infra';
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
            provide: CreateUserUserCase.UseCase,
            useFactory: (repository: UserRepository.Repository) => {
                return new CreateUserUserCase.UseCase(repository);
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
            provide: DeleteUserUseCase.UseCase,
            useFactory: (repository: UserRepository.Repository) => {
                return new DeleteUserUseCase.UseCase(repository);
            },
            inject: [REPOSITORIES.USER_REPOSITORY.provide],
        };
    }
}
