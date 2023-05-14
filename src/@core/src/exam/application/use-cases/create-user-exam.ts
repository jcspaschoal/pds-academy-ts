import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {AnsweredQuestion, AnsweredQuestionProps, ExamRepository} from "#exam/domain";
import {UserExamOutputDto, UserExamOutputMapper} from "../dto";


export namespace CreateUserExamUseCase {

    export class UseCase implements DefaultUseCase<Input, Output> {

        constructor(private examRepository: ExamRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const exam = await this.examRepository.getExamByExamUUID(input.examId)
            const questions = input.answeredQuestions.map((question) => {
                return new AnsweredQuestion({
                    questionAnswer: question.questionAnswer,
                    questionNumber: question.questionNumber
                })
            })
            const userExam = await exam.calculateExamScore(questions, input.userId)
            await this.examRepository.submitUserExam(userExam)
            return UserExamOutputMapper.toOutput(userExam)
        }

    }


    export type Input = {
        userId: string;
        examId: string;
        answeredQuestions: AnsweredQuestionProps[];
    };
    export type Output = UserExamOutputDto
}