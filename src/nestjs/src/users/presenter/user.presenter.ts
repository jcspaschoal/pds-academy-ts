import { UserOutput } from '@pds/academy-core/user/application';


export class UserPresenter {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;

  constructor(userOutput: UserOutput) {
    this.id = userOutput.id;
    this.first_name = userOutput.first_name;
    this.last_name = userOutput.last_name;
    this.email = userOutput.email;
    this.created_at = userOutput.created_at;
  }
}

