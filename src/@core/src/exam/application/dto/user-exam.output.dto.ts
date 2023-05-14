import {AnsweredQuestion, UserExam} from "#exam/domain";

export type UserExamOutputDto = {
    exam_id: string; score: number; examDate: Date; answers: AnsweredQuestion[]
}

export class UserExamOutputMapper {
    static toOutput(vo: UserExam): UserExamOutputDto {
        return {
            exam_id: vo.value.examUUID,
            score: vo.value.score,
            examDate: vo.value.examDate,
            answers: vo.value.answeredQuestions
        };
    }
}