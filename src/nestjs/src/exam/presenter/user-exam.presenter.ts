import { UserExamOutputDto } from '@pds/academy-core/exam/application';

export class UserExamPresenter {
  id_exam: string;
  score: number;
  exam_date: Date;
  answers: any[];

  constructor(examOutput: UserExamOutputDto) {
    this.id_exam = examOutput.exam_id;
    this.score = examOutput.score;
    this.exam_date = examOutput.examDate;
    this.answers = examOutput.answers.map((question) => {
      return {
        question_number: question.value.questionNumber,
        question_answer: question.value.questionAnswer,
      };
    });
  }
}
