import {PaginationOutputDto, PaginationOutputMapper, SearchInputDto} from "#seedwork/application";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {CourseModuleOutputDto, CourseModuleOutputMapper} from "../dto";
import {CourseModuleRepository, CourseRepository, InvalidOwnershipError, LessonRepository} from "#course/domain";

export namespace ListLessonUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly courseRepository: CourseRepository.Repository, private readonly courseModuleRepository: CourseModuleRepository.Repository, private readonly lessonRepository: LessonRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const course = await this.courseRepository.findById(input.courseId)
            const module = await this.courseModuleRepository.findById(input.moduleId)

            if (module.props.courseId !== input.courseId) {
                throw new InvalidOwnershipError("Module does not belong to the course");
            }

            const params = new CourseRepository.SearchParams(input.params)
            const modules = await this.courseModuleRepository.searchModulesByCourseID(input.courseId, params)
            return this.toOutput(modules)
        }

        private toOutput(searchResult: CourseModuleRepository.SearchResult): Output {
            const items = searchResult.items.map((item) => {
                return CourseModuleOutputMapper.toOutput(item)
            })
            return PaginationOutputMapper.toOutput(items, searchResult)
        }
    }

    export type Input = {
        params: SearchInputDto
        moduleId: string; courseId: string; userId: string;
    };

    export type Output = PaginationOutputDto<CourseModuleOutputDto>;
}

export default ListLessonUseCase;
