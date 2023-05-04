export class UploadError extends Error {
    constructor(error: any) {
        super(`Upload Error : ${error}`);
        this.name = "UploadError";
    }
}

export default UploadError;
