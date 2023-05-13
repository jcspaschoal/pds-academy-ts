import {UserExam} from "#exam/domain";

export type UserExamOutputDto = {
    exam_id: string; score: number; examDate: Date;
}

export class UserExamOutputMapper {
    static toOutput(vo: UserExam): UserExamOutputDto {
        return {exam_id: vo.value.examId, score: vo.value.score, examDate: vo.value.examDate};
    }
}