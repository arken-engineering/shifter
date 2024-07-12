/*
  Warnings:

  - You are about to drop the column `applicationId` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_applicationId_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "applicationId";
