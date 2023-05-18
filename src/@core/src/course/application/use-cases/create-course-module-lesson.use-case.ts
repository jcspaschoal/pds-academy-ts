import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {
    CourseModuleRepository,
    CourseRepository,
    Description,
    InvalidOwnershipError,
    Lesson,
    LessonRepository,
    Video
} from "#course/domain";


export namespace CreateLesson {

    export class UseCase implements DefaultUseCase<Input, Output> {

        constructor(
            private readonly courseRepository: CourseRepository.Repository,
            private readonly courseModuleRepository: CourseModuleRepository.Repository,
            private readonly lessonRepository: LessonRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const course = await this.courseRepository.findById(input.courseId)
            const module = await this.courseModuleRepository.findById(input.moduleId)

            if (course.props.userId !== input.userId) {
                throw new InvalidOwnershipError("Invalid ownership");
            }

            if (module.props.courseId !== input.courseId) {
                throw new InvalidOwnershipError("Module does not belong to the course");
            }

            const description = input.description ? new Description({text: input.description}) : null;
            const video = input.videoUrl ? new Video({url: input.videoUrl}) : null

            await this.lessonRepository.insert(new Lesson(
                {
                    moduleId: input.moduleId,
                    name: input.name,
                    description: description,
                    video: video,
                    order: input.order
                }
            ))

        }
    }


    export type Input = {
        userId: string;
        courseId: string;
        moduleId: string;
        name: string;
        order: number;
        description?: string;
        videoUrl?: string;
    };

    export type Output = void;
}