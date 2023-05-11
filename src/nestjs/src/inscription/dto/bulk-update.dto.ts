import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InscriptionUpdateDto {
  @IsUUID(4)
  @IsNotEmpty()
  readonly id: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;
}

export class BulkUpdateDto {
  @ValidateNested({ each: true })
  @Type(() => InscriptionUpdateDto)
  @ArrayMaxSize(15)
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  readonly items: InscriptionUpdateDto[];
}
