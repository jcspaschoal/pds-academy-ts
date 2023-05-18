import {Course, CourseRepository, Description, InvalidRoleError} from "#course/domain";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {UserRepository} from "#user/domain";


export namespace CreateCourseUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private readonly courseRepository: CourseRepository.Repository,
            private readonly userRepository: UserRepository.Repository
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const userEntity = await this.userRepository.findById(input.userId);
            const userRole = userEntity?.get_group.getRole();

            if (userRole !== "admin" && userRole !== "teacher") {
                throw new InvalidRoleError("To perform this operation, the user must have the role of 'teacher' or 'admin'.");
            }

            const description = input.description
                ? new Description({text: input.description})
                : null;

            const courseEntity = new Course({
                userId: input.userId,
                name: input.name,
                minScore: input.minScore,
                description,
            });

            await this.courseRepository.insert(courseEntity)

        }
    }

    export type Input = {
        userId: string;
        name: string;
        minScore?: number;
        description?: string;
    };

    export type Output = void;
}
