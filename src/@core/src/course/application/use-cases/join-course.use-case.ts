import {CourseRepository, ScoreInsufficientException} from "#course/domain";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {ExamRepository} from "#exam/domain";


export namespace JoinCourseUseCase {

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private readonly courseRepository: CourseRepository.Repository,
            private readonly examRepository: ExamRepository.Repository
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const course = await this.courseRepository.findById(input.courseId)
            const userExam = await this.examRepository.getLastUserExam(input.userId)
            console.log(course)
            if (course.canJoin(userExam.value.score ?? 0)) {
                return await this.courseRepository.joinCourse(input.userId, input.courseId)

            }
            throw new ScoreInsufficientException()

        }
    }

    export type Input = {
        userId: string;
        courseId: string;
    };

    export type Output = void;
}

