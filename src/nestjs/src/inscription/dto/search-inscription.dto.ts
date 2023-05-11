import { ListInscriptionUseCase } from '@pds/academy-core/inscription/application';
import { SortDirection } from '@pds/academy-core/@seedwork/domain';

export class SearchInscriptionDto implements ListInscriptionUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
