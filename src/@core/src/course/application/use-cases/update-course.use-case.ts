import {CourseRepository, Description, InvalidOwnershipError} from "#course/domain";
import {default as DefaultUseCase} from "@seedwork/application/use-case";


export namespace UpdateCourseUseCase {

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly courseRepository: CourseRepository.Repository,) {
        }

        async execute(input: Input): Promise<Output> {

            const course = await this.courseRepository.findById(input.courseId)
            if (course.props.userId !== input.userId) {
                throw new InvalidOwnershipError("Invalid ownership")
            }

            const description = input.description
                ? new Description({text: input.description})
                : null;

            course.update({
                minScore: input.minScore,
                name: input.name,
                description: description,
            })

            await this.courseRepository.update(course);
        }
    }

    export type Input = {
        courseId: string;
        userId: string,
        minScore?: number;
        description?: string,
        name: string
    };

    export type Output = void;
}
