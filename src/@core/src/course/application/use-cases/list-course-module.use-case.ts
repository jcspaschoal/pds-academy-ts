import {PaginationOutputDto, PaginationOutputMapper, SearchInputDto} from "#seedwork/application";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {CourseModuleOutputDto, CourseModuleOutputMapper} from "../dto";
import {CourseModuleRepository} from "#course/domain";
import {UserRepository} from "#user/domain";

export namespace ListCourseModuleUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly courseModuleRepository: CourseModuleRepository.Repository, private readonly userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const courseModules = await this.courseModuleRepository.searchModulesByCourseID(input.courseId, input.params)
            return this.toOutput(courseModules)
        }

        private toOutput(searchResult: CourseModuleRepository.SearchResult): Output {
            const items = searchResult.items.map((item) => {
                return CourseModuleOutputMapper.toOutput(item)
            })

            return PaginationOutputMapper.toOutput(items, searchResult)
        }
    }

    export type Input = { params: SearchInputDto, courseId: string };


    export type Output = PaginationOutputDto<CourseModuleOutputDto>;
}


export default ListCourseModuleUseCase;
