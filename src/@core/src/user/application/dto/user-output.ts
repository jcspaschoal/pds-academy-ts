import { User } from "../../domain/entities";

export type UserOutput = {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  status: boolean;
  created_at?: Date;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    return entity.toJSON();
  }
}

export type UpdateUserOutput = {
  id: string;
  first_name?: string;
  last_name?: string;
};
