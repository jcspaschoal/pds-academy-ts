import {ValueObject} from "#seedwork/domain";
import {InvalidGroupError} from "#user/domain";

export enum GroupTypes {
    Student = 1,
    Admin,
    Teacher,
}

export type GroupProperties = {
    type: GroupTypes
    permissions?: string[]
}

export class Group extends ValueObject<GroupProperties> {
    constructor(value: GroupProperties) {
        super(value);
    }

    public getRole() {
        if(this.value.type === GroupTypes.Teacher) {
            return "teacher"
        }

        if(this.value.type === GroupTypes.Admin) {
            return "admin"
        }

        if(this.value.type === GroupTypes.Student) {
            return "student"
        }

    }

    private validate() {
        const isValid = this.value.type === GroupTypes.Teacher || GroupTypes.Admin || GroupTypes.Student;
        if (!isValid) {
            throw new InvalidGroupError(this.value.type)
        }
    }

}