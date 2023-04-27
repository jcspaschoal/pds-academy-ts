import {ValueObject} from "#seedwork/domain";
import InvalidRoleError from "#admin/domain/errors/invalid-role.error";

export enum AdminRoleValues {
    Number = 1, String = "admin"
}

export type RoleProps = {
    role: AdminRoleValues
}

export class AdminRole extends ValueObject<RoleProps> {
    constructor(value: RoleProps) {
        super(value);
    }

    private validate() {
        const isValid = this.value.role === AdminRoleValues.Number || AdminRoleValues.String;
        if (!isValid) {
            throw new InvalidRoleError(this.value.role)
        }
    }

}