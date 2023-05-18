-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
