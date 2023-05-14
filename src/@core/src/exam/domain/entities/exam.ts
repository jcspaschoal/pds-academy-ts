import {Entity, UniqueEntityId} from "#seedwork/domain";
import {AnsweredQuestion, Question, UserExam} from "#exam/domain";


export type ExamProps = {
    exam_numeric_id: number;
    questions: Question[];
    created_at?: Date
}


export class Exam extends Entity<ExamProps> {
    private questionsDict: { [key: number]: string } = {};

    constructor(public readonly props: ExamProps, id?: UniqueEntityId) {
        super(props, id);
        this.props.created_at = this.props.created_at ?? new Date();
        this.populateQuestionsAnswersDictionary();
    }

    async calculateExamScore(userAnswers: AnsweredQuestion[], userId: string): Promise<UserExam> {
        const totalQuestions = this.props.questions.length
        let totalOfRightAnswers = 0;
        userAnswers.forEach(
            (answer) => {
                const question = this.questionsDict[answer.value.questionNumber]
                if (question === answer.value.questionAnswer) {
                    totalOfRightAnswers++;
                }
            }
        )

        const userScore = (totalOfRightAnswers / totalQuestions) * 100


        return new UserExam({
            userId: userId,
            examId: this.props.exam_numeric_id,
            examUUID: this.id,
            examDate: new Date(),
            answeredQuestions: userAnswers,
            score: userScore
        })
    }

    private populateQuestionsAnswersDictionary() {
        this.props.questions.forEach((question) => {
            this.questionsDict[question.value.questionNumber] = question.value.rightAnswer
        })
    }
}