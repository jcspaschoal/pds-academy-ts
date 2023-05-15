import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {
    CourseModule,
    CourseModuleRepository,
    CourseRepository,
    Description,
    InvalidOwnershipError
} from "#course/domain";


export namespace CreateCourseModuleUseCase {

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly courseModuleRepository: CourseModuleRepository.Repository,
                    private readonly courseRepository: CourseRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const description = input.description ? new Description({text: input.description}) : null;
            const course = await this.courseRepository.findCourseByOwnerId(input.courseId)


            if (course.props.userId !== input.userId) {
                throw new InvalidOwnershipError("Invalid ownership")
            }


            const courseModuleEntity = new CourseModule({
                courseId: input.courseId,
                name: input.name,
                order: input.order,
                description: description,
            })

            await this.courseModuleRepository.insert(courseModuleEntity)

        }
    }

    export type Input = {
        userId: string;
        courseId: string
        name: string;
        order: number;
        description?: string;
    };

    export type Output = void;
}