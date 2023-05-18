

export class ConditionalError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ConditionalError';
    }
}

export default ConditionalError;


