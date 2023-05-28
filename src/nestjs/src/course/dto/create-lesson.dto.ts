export class CreateLessonDto {
  courseId: string;
  moduleId: string;
  name: string;
  order: number;
  description?: string;
  videoUrl: string;
}
