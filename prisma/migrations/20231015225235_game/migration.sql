/*
  Warnings:

  - You are about to drop the column `value` on the `bounties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bounties" DROP COLUMN "value",
ADD COLUMN     "description" TEXT;
