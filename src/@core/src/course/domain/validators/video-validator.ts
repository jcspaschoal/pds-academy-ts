import {IsNotEmpty, IsString, Matches} from "class-validator";
import {ClassValidatorFields} from "#seedwork/domain";
import {VideoProps} from "#course/domain";


export class VideoRules {

    @IsString()
    @IsNotEmpty()
    @Matches(/^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/)
    url: string

    constructor({url}: VideoProps) {
        Object.assign(this, {url});
    }
}

export class VideoValidator extends ClassValidatorFields<VideoRules> {
    validate(data: any): boolean {
        return super.validate(new VideoRules(data ?? ({} as any)));
    }
}

export class VideoValidatorFactory {
    static create() {
        return new VideoValidator();
    }
}