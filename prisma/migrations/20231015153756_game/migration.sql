/*
  Warnings:

  - You are about to drop the column `applicationId` on the `achievements` table. All the data in the column will be lost.
  - Added the required column `metaverseId` to the `achievements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_applicationId_fkey";

-- AlterTable
ALTER TABLE "achievements" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
