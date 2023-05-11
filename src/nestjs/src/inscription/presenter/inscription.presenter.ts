import {
  InscriptionOutputDto,
  ListInscriptionUseCase,
} from '@pds/academy-core/inscription/application';
import { CollectionPresenter } from '../../@share/presenters/collection.presenter';

export class InscriptionPresenter {
  inscription_id: string;
  status: string;
  created_at: Date;

  constructor(inscriptionOutput: InscriptionOutputDto) {
    this.inscription_id = inscriptionOutput.id;
    this.created_at = inscriptionOutput.created_at;
    this.status = inscriptionOutput.status.value.toString();
  }
}

export class InscriptionCollectionPresenter extends CollectionPresenter {
  data: InscriptionPresenter[];

  constructor(output: ListInscriptionUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new InscriptionPresenter(item));
  }
}
