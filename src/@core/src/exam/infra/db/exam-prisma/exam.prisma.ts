import {AnsweredQuestion, Exam, ExamRepository as ExamRepositoryContract, Question, UserExam} from "#exam/domain";
import {EntityValidationError, LoadEntityError, NotFoundError, UniqueEntityId} from "#seedwork/domain";
import {
    Exam as ExamModelPrisma,
    PrismaClient,
    Question as QuestionModelPrisma,
    UserHasExam as UserExamModelPrisma
} from "@prisma/client";


export namespace ExamPrisma {
    export class ExamRepository implements ExamRepositoryContract.Repository {
        sortableFields: string[] = ['created_at'];

        constructor(private prisma: PrismaClient) {
        }

        async getExamByExamUUID(examUUID: string | UniqueEntityId): Promise<Exam> {
            const id = examUUID instanceof UniqueEntityId ? examUUID.id : examUUID;
            const prismaExam = await this.prisma.exam.findFirst({
                where: {
                    id_uuid_exam: id
                }, include: {
                    examHasQuestion: {
                        include: {
                            question: true
                        }
                    }
                }
            })

            if (!prismaExam) {
                throw new NotFoundError("Exam does not exists")
            }


            const questions = prismaExam.examHasQuestion.map((exam) => exam.question)

            return ExamModelMapper.examToEntity(prismaExam, questions);
        }

        async getLastUserExam(userId: string | UniqueEntityId): Promise<UserExam> {
            const id = userId instanceof UniqueEntityId ? userId.id : userId;
            const prismaUserExam = await this.prisma.userHasExam.findFirst(
                {
                    where:
                        {
                            user_id: id
                        },
                    orderBy: {
                        exam_date: 'desc'
                    }
                }
            )

            if (!prismaUserExam) {
                throw new NotFoundError("User does not any exam")
            }

            const exam = await this.prisma.exam.findUniqueOrThrow(
                {
                    where: {
                        id_exam: prismaUserExam.exam_id
                    }
                }
            )

            return ExamModelMapper.userExamToEntity(prismaUserExam, exam.id_uuid_exam);
        }

        async getRandomExam(): Promise<Exam> {
            const randomNumber = Math.floor(Math.random() * 30) + 31;
            const prismaExam = await this.prisma.exam.findFirst({
                where: {
                    id_exam: randomNumber
                },
                include: {
                    examHasQuestion: {
                        include: {
                            question: true
                        }
                    }
                }
            })
            const questions = prismaExam.examHasQuestion.map((exam) => exam.question)
            return ExamModelMapper.examToEntity(prismaExam, questions);
        }

        search(props: ExamRepositoryContract.SearchParams): Promise<ExamRepositoryContract.SearchResult> {
            return Promise.resolve(undefined);
        }

        async submitUserExam(userExam: UserExam): Promise<void> {

            await this.prisma.userHasExam.create({
                data: {
                    user_id: userExam.value.userId,
                    exam_id: userExam.value.examId,
                    score: userExam.value.score,
                    exam_date: userExam.value.examDate,
                    user_exam: {
                        questions: userExam.value.answeredQuestions.map(
                            (question) => {
                                return {
                                    number: question.value.questionNumber,
                                    answer: question.value.questionAnswer
                                }
                            }
                        )
                    }
                }
            })
        }
    }

    export class ExamModelMapper {
        static examToEntity(model: ExamModelPrisma, prismaQuestions: QuestionModelPrisma[]) {
            try {
                const {id_uuid_exam, ...otherData} = model;
                const questions = prismaQuestions.map((question) => {
                    return new Question(
                        {
                            questionNumber:
                            question.id_question,
                            description: question.description,
                            optionA: question.option_a,
                            optionB: question.option_b,
                            optionC: question.option_c,
                            optionD: question.option_d,
                            rightAnswer: question.answer
                        })
                })

                return new Exam({
                    exam_numeric_id: otherData.id_exam,
                    questions: questions,
                    created_at: otherData.created_at
                }, new UniqueEntityId(id_uuid_exam))

            } catch (e) {
                if (e instanceof EntityValidationError) {
                    throw new LoadEntityError(e.error);
                }
                throw e;
            }
        }

        static userExamToEntity(model: UserExamModelPrisma, examUUID: string) {
            try {

                // @ts-ignore
                const questions = model.user_exam.questions.map(
                    (question) => {
                        return new AnsweredQuestion({
                            questionNumber: question.number,
                            questionAnswer: question.answer
                        })
                    }
                )

                return new UserExam({
                    userId: model.user_id,
                    examId: model.exam_id,
                    examUUID: examUUID,
                    score: model.score.toNumber(),
                    answeredQuestions: questions,
                    examDate: model.exam_date
                })


            } catch (e) {
                if (e instanceof EntityValidationError) {
                    throw new LoadEntityError(e.error);
                }
                throw e;
            }
        }
    }
}