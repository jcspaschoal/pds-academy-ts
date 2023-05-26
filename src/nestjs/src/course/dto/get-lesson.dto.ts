import { ListLessonUseCase } from '@pds/academy-core/course/application';
import { SearchInputDto } from '@pds/academy-core/@seedwork/application';

export class GetLessonDto {
  courseId: string;
  moduleId: string;
  lessonId: string;
}

export class SearchLessonDto implements ListLessonUseCase.Input {
  courseId: string;
  moduleId: string;
  params: SearchInputDto;
  userId: string;
}
