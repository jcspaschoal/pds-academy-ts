import { UserOutput } from '@pds/academy-core/src/user/application/dto/user-output';
import { CollectionPresenter } from 'src/@share/presenters/collection.presenter';
import { GetUserUseCase } from '@pds/academy-core/src/user/application';

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

export class UserColletionPresenter extends CollectionPresenter {
  data: UserPresenter[];
  constructor(output: GetUserUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new UserPresenter(item));
  }
}
