export class InvalidOwnershipError extends Error {
    constructor(message?: string) {
        super(message || "Invalid ownership.");
        this.name = "InvalidOwnershipException";
    }
}

export default InvalidOwnershipError;
