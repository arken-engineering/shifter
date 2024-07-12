/*
  Warnings:

  - You are about to drop the `assetsOnProfiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "assetsOnProfiles" DROP CONSTRAINT "assetsOnProfiles_assetId_fkey";

-- DropForeignKey
ALTER TABLE "assetsOnProfiles" DROP CONSTRAINT "assetsOnProfiles_profileId_fkey";

-- AlterTable
ALTER TABLE "trades" ADD COLUMN     "buyerId" UUID;

-- DropTable
DROP TABLE "assetsOnProfiles";

-- CreateTable
CREATE TABLE "items" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "key" VARCHAR(100),
    "value" TEXT,
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) DEFAULT 'active',
    "assetId" UUID NOT NULL,
    "applicationId" UUID NOT NULL,
    "metaverseId" UUID,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "chain" VARCHAR(30),

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemsOnProfiles" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'active',

    CONSTRAINT "itemsOnProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "items_deletedAt_idx" ON "items"("deletedAt");

-- CreateIndex
CREATE INDEX "items_key_idx" ON "items"("key");

-- CreateIndex
CREATE INDEX "items_name_idx" ON "items"("name");

-- CreateIndex
CREATE INDEX "items_status_idx" ON "items"("status");

-- CreateIndex
CREATE INDEX "items_createdAt_updatedAt_idx" ON "items"("createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "itemsOnProfiles_profileId_itemId_idx" ON "itemsOnProfiles"("profileId", "itemId");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itemsOnProfiles" ADD CONSTRAINT "itemsOnProfiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsOnProfiles" ADD CONSTRAINT "itemsOnProfiles_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
