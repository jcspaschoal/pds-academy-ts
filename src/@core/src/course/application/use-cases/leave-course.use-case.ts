import {CourseRepository} from "#course/domain";
import {default as DefaultUseCase} from "@seedwork/application/use-case";


export namespace LeaveCourseUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly courseRepository: CourseRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            await this.courseRepository.leaveCourse(input.userId, input.courseId)
        }
    }

    export type Input = {
        userId: string;
        courseId: string;
    };

    export type Output = void;
}

