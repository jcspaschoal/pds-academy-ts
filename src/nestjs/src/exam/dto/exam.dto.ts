import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserAnswer {
  @IsNumber()
  @IsNotEmpty()
  readonly number: number;

  @IsNotEmpty()
  @MaxLength(1)
  @MinLength(1)
  readonly answer: string;
}

export class UserExamDto {
  @IsNotEmpty()
  @IsUUID('4')
  readonly exam_id: string;

  @ValidateNested({ each: true })
  @Type(() => UserAnswer)
  @ArrayMaxSize(10)
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  readonly questions: UserAnswer[];
}
