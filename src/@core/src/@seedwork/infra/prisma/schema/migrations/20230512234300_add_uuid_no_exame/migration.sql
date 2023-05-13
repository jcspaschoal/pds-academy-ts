/*
  Warnings:

  - A unique constraint covering the columns `[id_uuid_exam]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_uuid_exam` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "id_uuid_exam" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exam_id_uuid_exam_key" ON "Exam"("id_uuid_exam");
