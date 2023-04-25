/*
  Warnings:

  - You are about to drop the `GroupHasPermssion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupHasPermssion" DROP CONSTRAINT "GroupHasPermssion_group_id_fkey";

-- DropForeignKey
ALTER TABLE "GroupHasPermssion" DROP CONSTRAINT "GroupHasPermssion_permission_id_fkey";

-- DropTable
DROP TABLE "GroupHasPermssion";

-- CreateTable
CREATE TABLE "GroupHasPermission" (
    "permission_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "GroupHasPermission_pkey" PRIMARY KEY ("permission_id","group_id")
);

-- AddForeignKey
ALTER TABLE "GroupHasPermission" ADD CONSTRAINT "GroupHasPermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id_permission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupHasPermission" ADD CONSTRAINT "GroupHasPermission_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id_group") ON DELETE RESTRICT ON UPDATE CASCADE;
