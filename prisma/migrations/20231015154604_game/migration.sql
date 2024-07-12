/*
  Warnings:

  - You are about to drop the column `applicationId` on the `realms` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `servers` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `tournaments` table. All the data in the column will be lost.
  - Added the required column `metaverseId` to the `realms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `servers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_realmId_fkey";

-- DropForeignKey
ALTER TABLE "realms" DROP CONSTRAINT "realms_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "servers" DROP CONSTRAINT "servers_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "tournaments" DROP CONSTRAINT "tournaments_applicationId_fkey";

-- AlterTable
ALTER TABLE "realms" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "servers" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "tournaments" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "realms" ADD CONSTRAINT "realms_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
