import {Entity, UniqueEntityId} from "#seedwork/domain";
import {InscriptionStatus, Status, Document} from "#inscription/domain/value-objects";

export type InscriptionProps = {
    userId: UniqueEntityId | string
    document: Document;
    status?: InscriptionStatus;
    created_at?: Date;
}

export class Inscription extends Entity<InscriptionProps> {

    constructor(public readonly props: InscriptionProps, id?: UniqueEntityId) {
        super(props, id);
        this.props.created_at = this.props.created_at ?? new Date();
        this.status = this.props.status ?? new InscriptionStatus({name: Status.Pendent})
        this.document = this.props.document
    }

    get document() {
        return this.props.document
    }

    private set document(document: Document) {
        this.props.document = document
    }

    get userId() {
        return this.props.userId
    }

    get status() {
        return this.props.status
    }

    private set status(status: InscriptionStatus) {
        this.props.status = status
    }

    public uploadDocument(document: Document) {
        this.document = document;
    }

    public changeStatusToApproved() {
        this.status = new InscriptionStatus({name: Status.Approved})
    }

    public changeStatusToDenied() {
        this.status = new InscriptionStatus({name: Status.Denied})
    }

}

