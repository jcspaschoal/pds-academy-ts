import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {ExamRepository} from "#exam/domain";
import {UserExamOutputDto, UserExamOutputMapper} from "#exam/application";


export namespace GetLastUserExam {

    export class UseCase implements DefaultUseCase<Input, Output> {

        constructor(private examRepository: ExamRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const userExam = await this.examRepository.getLastUserExam(input.userId)
            return UserExamOutputMapper.toOutput(userExam)
        }

    }


    export type Input = {
        userId: string;
    };
    export type Output = UserExamOutputDto
}