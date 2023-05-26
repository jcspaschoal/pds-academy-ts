import { ListCourseModuleUseCase } from '@pds/academy-core/course/application';
import { SearchInputDto } from '@pds/academy-core/@seedwork/application';

export class GetCourseModuleDtoDto {
  courseId: string;
  moduleId: string;
}

export class SearchModuleDto implements ListCourseModuleUseCase.Input {
  courseId: string;
  moduleId: string;
  params: SearchInputDto;
  userId: string;
}
