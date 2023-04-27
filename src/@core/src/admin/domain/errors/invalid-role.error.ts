
export class InvalidRole extends Error {
    constructor(invalidType: any) {
        super(`Invalid role : ${invalidType}`);
        this.name = "InvalidRole";
    }
}

export default InvalidRole;
