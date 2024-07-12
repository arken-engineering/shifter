/*
  Warnings:

  - You are about to drop the column `value` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assets" DROP COLUMN "value",
ADD COLUMN     "uri" TEXT;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "value",
ADD COLUMN     "content" TEXT;
