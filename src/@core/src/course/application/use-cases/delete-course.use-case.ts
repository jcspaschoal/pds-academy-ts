import {CourseRepository, InvalidOwnershipError} from "#course/domain";
import {default as DefaultUseCase} from "@seedwork/application/use-case";


export namespace DeleteCourseUseCase {

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly courseRepository: CourseRepository.Repository,) {
        }

        async execute(input: Input): Promise<Output> {
            const course = await this.courseRepository.findById(input.courseId)
            if (course.props.userId !== input.userId) {
                throw new InvalidOwnershipError("Invalid ownership")
            }

            await this.courseRepository.delete(input.courseId);
        }
    }

    export type Input = {
        courseId: string;
        userId: string
    };

    export type Output = void;
}
