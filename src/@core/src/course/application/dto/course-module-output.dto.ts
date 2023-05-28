import {CourseModule, Description, Lesson} from "#course/domain";

export type CourseModuleOutputDto = {
    id: string;
    courseId: string;
    created_at?: Date;
    description?: Description;
    name: string;
    lessons?: Lesson[]
};

export class CourseModuleOutputMapper {
    static toOutput(entity: CourseModule): CourseModuleOutputDto {
        return entity.toJSON();
    }
}
