import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto {
  id: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  is_active?: boolean;
}
