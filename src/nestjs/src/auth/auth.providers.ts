/* eslint-disable @typescript-eslint/no-namespace */
import {GetUserUseCase} from '@pds/academy-core/user/application';
import {UserRepository} from '@pds/academy-core/user/domain';
import {UserPrisma} from '@pds/academy-core/user/infra';
import {PrismaClient} from '@prisma/client';
import {PrismaService} from '../database/prisma-service.service';

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

        export const GET_USER_USE_CASE = {
            provide: GetUserUseCase.UseCase,
            useFactory: (repository: UserRepository.Repository) => {
                return new GetUserUseCase.UseCase(repository);
            },
            inject: [REPOSITORIES.USER_REPOSITORY.provide],
        };

    }
}
