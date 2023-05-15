export class InvalidRoleError extends Error {
    constructor(message?: string) {
        super(message || "InvalidRole");
        this.name = "InvalidRole";
    }
}

export default InvalidRoleError;
