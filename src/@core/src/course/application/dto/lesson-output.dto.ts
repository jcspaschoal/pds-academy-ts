import {Description, Lesson, Video} from "#course/domain";

export type LessonOutputDto = {
    id: string;
    name: string;
    moduleId: string;
    order: number;
    video?: Video;
    description?: Description;
    createdAt?: Date;
};

export class LessonOutputMapper {
    static toOutput(entity: Lesson): LessonOutputDto {
        return entity.toJSON();
    }
}
