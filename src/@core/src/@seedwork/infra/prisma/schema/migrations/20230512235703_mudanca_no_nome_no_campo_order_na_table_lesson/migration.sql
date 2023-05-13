/*
  Warnings:

  - You are about to drop the column `order` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `lesson_order` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "order",
ADD COLUMN     "lesson_order" INTEGER NOT NULL;
