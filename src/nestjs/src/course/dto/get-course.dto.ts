import { ListCourseUseCase } from '@pds/academy-core/course/application';
import { SortDirection } from '@pds/academy-core/@seedwork/domain';

export class SearchCourseDto implements ListCourseUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
