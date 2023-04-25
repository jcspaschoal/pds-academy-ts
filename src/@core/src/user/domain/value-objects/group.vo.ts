import {ValueObject} from "../../../@seedwork/domain";
import {InvalidGroupError} from "../../../user/domain/errors";

export enum GroupTypes {
    Student = 1,
    Teacher,
    Admin,
}

export type GroupProperties = {
    type: GroupTypes
    role?: string
    permissions?: string[]
}

export class Group extends ValueObject<GroupProperties> {
     constructor(value: GroupProperties) {
        super(value);
    }

    private validate() {
        const isValid = this.value.type === GroupTypes.Teacher || GroupTypes.Admin || GroupTypes.Student;
        if(!isValid) {
            throw new InvalidGroupError(this.value.type)
        }
    }

}