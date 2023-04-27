
export class InvalidInscriptionStatus extends Error {
    constructor(invalidType: any) {
        super(`Invalid status : ${invalidType}`);
        this.name = "InvalidInscriptionStatus";
    }
}

export default InvalidInscriptionStatus;
