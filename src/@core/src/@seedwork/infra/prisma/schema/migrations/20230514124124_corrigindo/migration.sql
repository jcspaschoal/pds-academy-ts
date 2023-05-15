/*
  Warnings:

  - The primary key for the `UserHasExam` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserHasExam" DROP CONSTRAINT "UserHasExam_pkey",
ADD CONSTRAINT "UserHasExam_pkey" PRIMARY KEY ("user_id", "exam_id", "exam_date");
