import {
  CourseModuleOutputDto,
  ListCourseModuleUseCase,
} from '@pds/academy-core/course/application';
import { CollectionPresenter } from '../../@share/presenters/collection.presenter';

export class CourseModulePresenter {
  course_module_id: string;
  created_at: Date;
  constructor(courseModule: CourseModuleOutputDto) {
    this.course_module_id = courseModule.courseId;
    this.created_at = courseModule.created_at;
  }
}

export class CourseModuleCollectionPresenter extends CollectionPresenter {
  data: CourseModulePresenter[];

  constructor(output: ListCourseModuleUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CourseModulePresenter(item));
  }
}
