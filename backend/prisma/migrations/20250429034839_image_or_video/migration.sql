-- CreateEnum
CREATE TYPE "ImageOrVideo" AS ENUM ('Image', 'Video');

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "ImageOrVideo" "ImageOrVideo" NOT NULL DEFAULT 'Image';
