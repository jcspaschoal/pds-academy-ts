import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {AnsweredQuestion, ExamRepository} from "#exam/domain";
import {UserExamOutputDto, UserExamOutputMapper} from "#exam/application";


export namespace CreateUserExamUseCase {

    export class UseCase implements DefaultUseCase<Input, Output> {

        constructor(private examRepository: ExamRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const exam = await this.examRepository.getExamByExamUUID(input.examId)
            const userExam = await exam.calculateExamScore(input.answeredQuestions, input.userId)
            await this.examRepository.submitUserExam(userExam)
            return UserExamOutputMapper.toOutput(userExam)
        }

    }


    export type Input = {
        userId: string;
        examId: string;
        answeredQuestions: AnsweredQuestion[];
    };
    export type Output = UserExamOutputDto
}