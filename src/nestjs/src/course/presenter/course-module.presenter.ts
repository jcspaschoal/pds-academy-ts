import {
  CourseModuleOutputDto,
  ListCourseModuleUseCase,
} from '@pds/academy-core/course/application';
import { CollectionPresenter } from '../../@share/presenters/collection.presenter';

export class CourseModulePresenter {
  course_module_id: string;
  lessons: any[];
  created_at: Date;
  constructor(courseModule: CourseModuleOutputDto) {
    this.course_module_id = courseModule.id;
    this.created_at = courseModule.created_at;
    this.lessons = courseModule.lessons.map((lesson) => {
      let lessonVideo = null;
      let lessonDescription = null;

      if (lesson.props?.video) {
        lessonVideo = lesson.props.video.value.url
          ? lesson.props.video.value.url
          : null;
      }

      if (lesson.props?.description) {
        lessonDescription = lesson.props.description.value.text
          ? lesson.props.description.value.text
          : null;
      }

      return {
        lesson_id: lesson.id,
        description: lessonDescription,
        name: lesson.name,
        video: lessonVideo,
      };
    });
  }
}

export class CourseModuleCollectionPresenter extends CollectionPresenter {
  data: CourseModulePresenter[];

  constructor(output: ListCourseModuleUseCase.Output) {
    const { items, ...paginationProps } = output;
    console.log(items);
    super(paginationProps);
    this.data = items.map((item) => new CourseModulePresenter(item));
  }
}
