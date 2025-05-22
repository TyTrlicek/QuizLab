/*
  Warnings:

  - You are about to drop the column `ImageOrVideo` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "ImageOrVideo",
ADD COLUMN     "imageOrVideo" TEXT NOT NULL DEFAULT 'Image';
