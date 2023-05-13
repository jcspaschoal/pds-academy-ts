import {Exam, Question} from "#exam/domain";

export type ExamOutputDto = {
    id: string;
    questions: Question[]
}

export class ExamOutputMapper {
    static toOutput(entity: Exam): ExamOutputDto {
        return entity.toJSON();
    }
}