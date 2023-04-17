import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsBoolean,
  IsOptional,
  IsDate,
  MinLength,
  IsEnum,
} from "class-validator";
import {
  UserGroup,
  UserProperties,
  UserUpdateProperties,
} from "../entities/user";
import ClassValidatorFields from "../../../@seedwork/domain/validators/class-validator-fields";
export class UserRules {
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

  constructor({ first_name, last_name, password }: UserUpdateProperties) {
    Object.assign(this, { first_name, last_name, password });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: any): boolean {
    return super.validate(new UserRules(data ?? ({} as any)));
  }

  update_validate(data: any): boolean {
    return super.validate(new UserUpdateRules(data ?? ({} as any)));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
