-- CreateEnum
CREATE TYPE "InscriptionStatus" AS ENUM ('Pendent', 'Denied', 'Approved');

-- CreateTable
CREATE TABLE "Permission" (
    "id_permission" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id_permission")
);

-- CreateTable
CREATE TABLE "GroupHasPermission" (
    "permission_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "GroupHasPermission_pkey" PRIMARY KEY ("permission_id","group_id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id_group" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id_group")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" UUID NOT NULL,
    "first_name" VARCHAR(45) NOT NULL,
    "last_name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "group_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Address" (
    "id_address" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "number" VARCHAR(45) NOT NULL,
    "description" VARCHAR(255),
    "street" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(45) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id_address")
);

-- CreateTable
CREATE TABLE "Inscription" (
    "id_inscription" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "document_path" VARCHAR(200) NOT NULL,
    "status" "InscriptionStatus" NOT NULL DEFAULT 'Pendent',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Inscription_pkey" PRIMARY KEY ("id_inscription")
);

-- CreateTable
CREATE TABLE "InscriptionHasAdmin" (
    "user_id" UUID NOT NULL,
    "inscription_id" UUID NOT NULL,

    CONSTRAINT "InscriptionHasAdmin_pkey" PRIMARY KEY ("inscription_id","user_id")
);

-- CreateTable
CREATE TABLE "UserHasExam" (
    "user_id" UUID NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "score" DECIMAL(4,2) NOT NULL,
    "exam_date" TIMESTAMP(3) NOT NULL,
    "user_exam" JSON NOT NULL,

    CONSTRAINT "UserHasExam_pkey" PRIMARY KEY ("user_id","exam_id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id_exam" SERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id_exam")
);

-- CreateTable
CREATE TABLE "ExamHasQuestion" (
    "exam_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "ExamHasQuestion_pkey" PRIMARY KEY ("question_id","exam_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id_question" SERIAL NOT NULL,
    "description" VARCHAR(400) NOT NULL,
    "answer" CHAR(1) NOT NULL,
    "option_a" VARCHAR(255) NOT NULL,
    "option_b" VARCHAR(255) NOT NULL,
    "option_c" VARCHAR(255) NOT NULL,
    "option_d" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id_question")
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "CategoryHasCourse" (
    "course_id" UUID NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "CategoryHasCourse_pkey" PRIMARY KEY ("course_id","category_id")
);

-- CreateTable
CREATE TABLE "UserHasCourse" (
    "course_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "UserHasCourse_pkey" PRIMARY KEY ("course_id","user_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id_course" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(400) NOT NULL,
    "min_score" DECIMAL(4,2) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id_course")
);

-- CreateTable
CREATE TABLE "CourseModule" (
    "id_module" SERIAL NOT NULL,
    "course_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL,
    "description" VARCHAR(400),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("id_module")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id_lesson" SERIAL NOT NULL,
    "module_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(400),
    "video_url" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id_lesson")
);

-- CreateTable
CREATE TABLE "Commentary" (
    "id_commentary" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "text" VARCHAR(400) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Commentary_pkey" PRIMARY KEY ("id_commentary")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id_rating" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "rating" DECIMAL(3,2) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id_rating")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_key" ON "Address"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inscription_user_id_key" ON "Inscription"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Question_description_key" ON "Question"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_user_id_key" ON "Rating"("user_id");

-- AddForeignKey
ALTER TABLE "GroupHasPermission" ADD CONSTRAINT "GroupHasPermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id_permission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupHasPermission" ADD CONSTRAINT "GroupHasPermission_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id_group") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id_group") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscriptionHasAdmin" ADD CONSTRAINT "InscriptionHasAdmin_inscription_id_fkey" FOREIGN KEY ("inscription_id") REFERENCES "Inscription"("id_inscription") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscriptionHasAdmin" ADD CONSTRAINT "InscriptionHasAdmin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasExam" ADD CONSTRAINT "UserHasExam_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasExam" ADD CONSTRAINT "UserHasExam_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("id_exam") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamHasQuestion" ADD CONSTRAINT "ExamHasQuestion_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("id_exam") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamHasQuestion" ADD CONSTRAINT "ExamHasQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id_question") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryHasCourse" ADD CONSTRAINT "CategoryHasCourse_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryHasCourse" ADD CONSTRAINT "CategoryHasCourse_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasCourse" ADD CONSTRAINT "UserHasCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasCourse" ADD CONSTRAINT "UserHasCourse_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "CourseModule"("id_module") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
