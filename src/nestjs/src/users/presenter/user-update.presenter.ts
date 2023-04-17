import {
  UpdateUserOutput,
  UserOutput,
} from '@pds/academy-core/src/user/application/dto/user-output';
import { CollectionPresenter } from 'src/@share/presenters/collection.presenter';
import { GetUserUseCase } from '@pds/academy-core/src/user/application';
import { Exclude, Expose } from 'class-transformer';

export class UserUpdatePresenter {
  id: string;
  first_name: string;
  last_name: string;
  password: string;

  constructor(userOutput: UpdateUserOutput) {
    this.id = userOutput.id;
    this.first_name = userOutput.first_name;
    this.last_name = userOutput.last_name;
  }
}
