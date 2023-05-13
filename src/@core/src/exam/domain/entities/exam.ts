import {Entity, UniqueEntityId} from "#seedwork/domain";
import {AnsweredQuestion, Question, UserExam} from "../value-objects";


export type ExamProps = {
    questions: Question[];
}


export class Exam extends Entity<ExamProps> {
    private questionsDict: { [key: number]: string } = {};

    constructor(public readonly props: ExamProps, id?: UniqueEntityId) {
        super(props, id);
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

        const userScore = totalOfRightAnswers / totalQuestions

        return new UserExam({
            userId: userId,
            examId: this.id,
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