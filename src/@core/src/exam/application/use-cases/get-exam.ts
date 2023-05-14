import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {ExamRepository} from "#exam/domain";
import {ExamOutputDto, ExamOutputMapper} from "../dto";


export namespace GetExam {

    export class UseCase implements DefaultUseCase<Input, Output> {

        constructor(private examRepository: ExamRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const exam = await this.examRepository.getRandomExam();
            return ExamOutputMapper.toOutput(exam)
        }

    }

    export type Input = void
    export type Output = ExamOutputDto
}