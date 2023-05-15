import {Course, Description} from "#course/domain";

export type CourseOutputDto = {
    id: string;
    userId: string;
    created_at?: Date;
    description: Description;
    name: string;
};

export class CourseOutputMapper {
    static toOutput(entity: Course): CourseOutputDto {
        return entity.toJSON();
    }
}
