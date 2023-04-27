export class InvalidGroupError extends Error {
    constructor(invalidType: any) {
        super(`Invalid group type type: ${invalidType}`);
        this.name = "InvalidGroupTypeError";
    }
}

export default InvalidGroupError;
