/*
  Warnings:

  - Made the column `chainId` on table `assets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_chainId_fkey";

-- AlterTable
ALTER TABLE "assets" ALTER COLUMN "chainId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
