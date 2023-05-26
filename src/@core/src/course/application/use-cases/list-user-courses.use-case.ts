import {PaginationOutputDto, PaginationOutputMapper, SearchInputDto} from "#seedwork/application";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {CourseOutputDto, CourseOutputMapper} from "../dto";
import {CourseRepository} from "#course/domain";

export namespace ListUserCourseUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly courseRepository: CourseRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const params = new CourseRepository.SearchParams(input.params)
            const courses = await this.courseRepository.findCoursesByUserId(input.userId, params)
            return this.toOutput(courses)
        }

        private toOutput(searchResult: CourseRepository.SearchResult): Output {
            const items = searchResult.items.map((item) => {
                return CourseOutputMapper.toOutput(item)
            })

            return PaginationOutputMapper.toOutput(items, searchResult)
        }
    }

    export type Input = {
        params: SearchInputDto,
        userId: string
    };


    export type Output = PaginationOutputDto<CourseOutputDto>;
}

export default ListUserCourseUseCase;
