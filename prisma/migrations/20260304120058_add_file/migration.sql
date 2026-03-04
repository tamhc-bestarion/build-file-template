/*
  Warnings:

  - You are about to drop the column `fileName` on the `FileBuild` table. All the data in the column will be lost.
  - Added the required column `content` to the `FileBuild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileBuild" DROP COLUMN "fileName",
ADD COLUMN     "content" TEXT NOT NULL;
