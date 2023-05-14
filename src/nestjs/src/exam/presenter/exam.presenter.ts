import { ExamOutputDto } from '@pds/academy-core/exam/application';

export class ExamPresenter {
  id_exam: string;
  created_at: Date;
  questions: any;

  constructor(examOutput: ExamOutputDto) {
    this.id_exam = examOutput.id;
    this.questions = examOutput.questions.map((question) => {
      return {
        id_question: question.value.questionNumber,
        description: question.value.description,
        option_a: question.value.optionA,
        option_b: question.value.optionB,
        option_c: question.value.optionC,
        option_d: question.value.optionD,
      };
    });
    this.created_at = examOutput.created_at;
  }
}
