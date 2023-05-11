import {Entity, UniqueEntityId} from "#seedwork/domain";
import {AdminRole} from "#admin/domain/value-objects/admin-role.vo";
import {Inscription} from "#inscription/domain/entities";


export type AdminProps = {
    userId: UniqueEntityId
    role: AdminRole;
}

export class Admin extends Entity<AdminProps> {

    constructor(public readonly props: AdminProps) {
        super(props, props.userId);
    }

    approveInscription(inscription: Inscription) {
        inscription.changeStatusToApproved()
    }

    dennyInscription(inscription: Inscription) {
        inscription.changeStatusToDenied()
    }

}