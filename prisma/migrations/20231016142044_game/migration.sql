/*
  Warnings:

  - You are about to drop the `productPressReleases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productPressReleases" DROP CONSTRAINT "productPressReleases_createdById_fkey";

-- DropForeignKey
ALTER TABLE "productPressReleases" DROP CONSTRAINT "productPressReleases_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "productPressReleases" DROP CONSTRAINT "productPressReleases_editedById_fkey";

-- DropForeignKey
ALTER TABLE "productPressReleases" DROP CONSTRAINT "productPressReleases_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "productPressReleases" DROP CONSTRAINT "productPressReleases_productId_fkey";

-- AlterTable
ALTER TABLE "cloudItems" ADD COLUMN     "applicationId" UUID;

-- AlterTable
ALTER TABLE "polls" ADD COLUMN     "applicationId" UUID;

-- AlterTable
ALTER TABLE "raffles" ADD COLUMN     "applicationId" UUID;

-- DropTable
DROP TABLE "productPressReleases";

-- AddForeignKey
ALTER TABLE "polls" ADD CONSTRAINT "polls_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffles" ADD CONSTRAINT "raffles_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cloudItems" ADD CONSTRAINT "cloudItems_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
