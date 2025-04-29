/*
  Warnings:

  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_pkey",
DROP COLUMN "title",
ADD COLUMN     "quizList" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "quizTitle" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "quizType" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "selectedCategories" TEXT[],
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Quiz_id_seq";
