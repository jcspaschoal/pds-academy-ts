import { UpdateUserOutput } from '@pds/academy-core/user/application';

export class UserUpdatePresenter {
  first_name: string;
  last_name: string;
  password: string;

  constructor(userOutput: UpdateUserOutput) {
    this.first_name = userOutput.first_name;
    this.last_name = userOutput.last_name;
  }
}
