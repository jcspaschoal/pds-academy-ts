import {PaginationOutputDto, SearchInputDto} from "#seedwork/application";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {CourseOutputDto} from "../dto";
import {CourseRepository} from "#course/domain";
import {UserRepository} from "#user/domain";

export namespace ListCourseUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly courseRepository: CourseRepository.Repository, private readonly userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            return
        }
    }

    export type Input = SearchInputDto;


    export type Output = PaginationOutputDto<CourseOutputDto>;
}

export default ListCourseUseCase;

