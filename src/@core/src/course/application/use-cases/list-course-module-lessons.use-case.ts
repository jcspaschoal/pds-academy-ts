import {PaginationOutputDto, PaginationOutputMapper, SearchInputDto} from "#seedwork/application";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {LessonOutputDto, LessonOutputMapper} from "../dto";
import {LessonRepository} from "#course/domain";

export namespace ListLessonUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly lessonRepository: LessonRepository.Repository,) {
        }

        async execute(input: Input): Promise<Output> {
            const lessons = await this.lessonRepository.searchLessonsByModuleId(input.moduleId, input.params)
            return this.toOutput(lessons)
        }

        private toOutput(searchResult: LessonRepository.SearchResult): Output {
            const items = searchResult.items.map((item) => {
                return LessonOutputMapper.toOutput(item)
            })

            return PaginationOutputMapper.toOutput(items, searchResult)
        }
    }

    export type Input = {
        params: SearchInputDto
        moduleId: string;
    };


    export type Output = PaginationOutputDto<LessonOutputDto>;
}

export default ListLessonUseCase;
