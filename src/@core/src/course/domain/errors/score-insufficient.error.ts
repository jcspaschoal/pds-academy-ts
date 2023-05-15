export class ScoreInsufficientException extends Error {
    constructor(message?: string) {
        super(message || "Insufficient score.");
        this.name = "ScoreInsufficientException";
    }
}
