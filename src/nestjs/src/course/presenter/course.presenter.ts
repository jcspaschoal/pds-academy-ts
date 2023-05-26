import {
  CourseOutputDto,
  ListCourseUseCase,
} from '@pds/academy-core/course/application';
import { CollectionPresenter } from '../../@share/presenters/collection.presenter';

export class CoursePresenter {
  course_id: string;
  created_at: Date;
  constructor(course: CourseOutputDto) {
    this.course_id = course.id;
    this.created_at = course.created_at;
  }
}

export class CourseCollectionPresenter extends CollectionPresenter {
  data: CoursePresenter[];

  constructor(output: ListCourseUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CoursePresenter(item));
  }
}
