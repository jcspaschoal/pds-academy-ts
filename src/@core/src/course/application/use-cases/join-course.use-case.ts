import {CourseRepository} from "#course/domain";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {ExamRepository} from "#exam/domain";
import {ConditionalError} from "#seedwork/domain";


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
            if (course.canJoin(userExam.value.score ?? 0)) {
                return await this.courseRepository.joinCourse(input.userId, input.courseId)
            }
            const scoreDifference = course.minScore - userExam.value.score
            throw new ConditionalError(`You need ${scoreDifference} more ${scoreDifference === 1 ? 'point' : 'points'} to perform this operation.`)
        }
    }

    export type Input = {
        userId: string;
        courseId: string;
    };

    export type Output = void;
}

