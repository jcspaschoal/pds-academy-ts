/*
  Warnings:

  - The primary key for the `UserHasCourse` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserHasCourse" DROP CONSTRAINT "UserHasCourse_pkey",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "UserHasCourse_pkey" PRIMARY KEY ("course_id", "user_id", "created_at");
