/*
  Warnings:

  - The primary key for the `CourseModule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id_module` on the `CourseModule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_lesson` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `module_id` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_module_id_fkey";

-- AlterTable
ALTER TABLE "CourseModule" DROP CONSTRAINT "CourseModule_pkey",
DROP COLUMN "id_module",
ADD COLUMN     "id_module" UUID NOT NULL,
ADD CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("id_module");

-- AlterTable
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_pkey",
DROP COLUMN "id_lesson",
ADD COLUMN     "id_lesson" UUID NOT NULL,
DROP COLUMN "module_id",
ADD COLUMN     "module_id" UUID NOT NULL,
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id_lesson");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "CourseModule"("id_module") ON DELETE CASCADE ON UPDATE CASCADE;
