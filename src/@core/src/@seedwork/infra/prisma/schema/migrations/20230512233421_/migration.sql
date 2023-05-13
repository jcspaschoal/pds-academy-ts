/*
  Warnings:

  - The primary key for the `InscriptionHasAdmin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Commentary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Commentary" DROP CONSTRAINT "Commentary_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseModule" DROP CONSTRAINT "CourseModule_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_module_id_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_user_id_fkey";

-- AlterTable
ALTER TABLE "InscriptionHasAdmin" DROP CONSTRAINT "InscriptionHasAdmin_pkey",
ADD CONSTRAINT "InscriptionHasAdmin_pkey" PRIMARY KEY ("inscription_id", "user_id", "created_at");

-- DropTable
DROP TABLE "Commentary";

-- DropTable
DROP TABLE "Rating";

-- AddForeignKey
ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "CourseModule"("id_module") ON DELETE CASCADE ON UPDATE CASCADE;
