import {IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {UserProperties, UserUpdateProperties,} from "#user/domain";
import ClassValidatorFields from "#seedwork/domain/validators/class-validator-fields";

export class UserRules {
    @MaxLength(100)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @MaxLength(100)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @MaxLength(100)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    password: string;

    @MaxLength(100)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsDate()
    @IsOptional()
    created_at: Date;

    constructor({
                    first_name,
                    last_name,
                    email,
                    password,
                    status,
                    created_at,
                }: UserProperties) {
        Object.assign(this, {
            first_name,
            last_name,
            email,
            password,
            status,
            created_at,
        });
    }
}

export class UserUpdateRules {
    @MaxLength(100)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    first_name: string;

    @MaxLength(100)
    @MinLength(3)
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @MaxLength(100)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string;

    constructor({first_name, last_name, password}: UserUpdateProperties) {
        Object.assign(this, {first_name, last_name, password});
    }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
    validate(data: any): boolean {
        return super.validate(new UserRules(data ?? ({} as any)));
    }
}

export class UserUpdateValidator extends ClassValidatorFields<UserUpdateRules> {
    validate(data: any): boolean {
        return super.validate(new UserUpdateRules(data ?? ({} as any)));
    }
}

const validatorsDirectory = {
    base: UserValidator,
    update: UserUpdateValidator
}

export type UserValidatorTypes = keyof typeof validatorsDirectory


export class UserValidatorFactory {
    static create(validator: UserValidatorTypes) {
        const validatorClass = validatorsDirectory[validator]
        if (!validatorClass) throw new Error("Invalid validator");
        return new validatorClass();
    }
}
