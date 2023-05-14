import {Exam, Question} from "#exam/domain";

export type ExamOutputDto = {
    id: string;
    questions: Question[]
    created_at: Date
}

export class ExamOutputMapper {
    static toOutput(entity: Exam): ExamOutputDto {
        return entity.toJSON();
    }
}