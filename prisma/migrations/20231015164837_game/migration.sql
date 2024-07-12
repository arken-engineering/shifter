/*
  Warnings:

  - You are about to drop the `gameGuide` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "gameGuide" DROP CONSTRAINT "gameGuide_createdById_fkey";

-- DropForeignKey
ALTER TABLE "gameGuide" DROP CONSTRAINT "gameGuide_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "gameGuide" DROP CONSTRAINT "gameGuide_editedById_fkey";

-- DropForeignKey
ALTER TABLE "gameGuide" DROP CONSTRAINT "gameGuide_ownerId_fkey";

-- DropTable
DROP TABLE "gameGuide";

-- CreateTable
CREATE TABLE "gameGuides" (
    "id" UUID NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "gameId" UUID NOT NULL,
    "metaverseId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameGuides_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gameGuides" ADD CONSTRAINT "gameGuides_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameGuides" ADD CONSTRAINT "gameGuides_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameGuides" ADD CONSTRAINT "gameGuides_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameGuides" ADD CONSTRAINT "gameGuides_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
