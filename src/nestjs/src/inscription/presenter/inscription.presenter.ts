import { InscriptionOutputDto } from '@pds/academy-core/inscription/application';

export class InscriptionPresenter {
  inscriptionId: string;
  status: string;
  created_at: Date;

  constructor(inscriptionOutput: InscriptionOutputDto) {
    this.inscriptionId = inscriptionOutput.id;
    this.created_at = inscriptionOutput.created_at;
    this.status = inscriptionOutput.status.value.name.toString();
  }
}
