/*
  Warnings:

  - You are about to drop the column `description` on the `raffles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "raffles" DROP COLUMN "description",
ADD COLUMN     "content" TEXT;

-- CreateTable
CREATE TABLE "raffleRequirements" (
    "id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "raffleRewardId" UUID,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'draft',

    CONSTRAINT "raffleRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raffleRewards" (
    "id" UUID NOT NULL,
    "raffleId" UUID,
    "winnerId" UUID,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'draft',

    CONSTRAINT "raffleRewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raffleRequirementsOnRaffleRewards" (
    "id" UUID NOT NULL,
    "raffleRequirementId" UUID NOT NULL,
    "raffleRewardId" UUID NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'draft',

    CONSTRAINT "raffleRequirementsOnRaffleRewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raffleEntries" (
    "id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "raffleRewardId" UUID,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'draft',
    "raffleId" UUID,

    CONSTRAINT "raffleEntries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "raffleRequirementsOnRaffleRewards_raffleRequirementId_raffl_idx" ON "raffleRequirementsOnRaffleRewards"("raffleRequirementId", "raffleRewardId");

-- AddForeignKey
ALTER TABLE "raffleRequirements" ADD CONSTRAINT "raffleRequirements_raffleRewardId_fkey" FOREIGN KEY ("raffleRewardId") REFERENCES "raffles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffleRequirements" ADD CONSTRAINT "raffleRequirements_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleRequirements" ADD CONSTRAINT "raffleRequirements_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleRequirements" ADD CONSTRAINT "raffleRequirements_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleRequirements" ADD CONSTRAINT "raffleRequirements_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffleRewards" ADD CONSTRAINT "raffleRewards_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "raffles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffleRewards" ADD CONSTRAINT "raffleRewards_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleRewards" ADD CONSTRAINT "raffleRewards_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleRewards" ADD CONSTRAINT "raffleRewards_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleRewards" ADD CONSTRAINT "raffleRewards_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffleRewards" ADD CONSTRAINT "raffleRewards_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffleRequirementsOnRaffleRewards" ADD CONSTRAINT "raffleRequirementsOnRaffleRewards_raffleRequirementId_fkey" FOREIGN KEY ("raffleRequirementId") REFERENCES "raffleRequirements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raffleRequirementsOnRaffleRewards" ADD CONSTRAINT "raffleRequirementsOnRaffleRewards_raffleRewardId_fkey" FOREIGN KEY ("raffleRewardId") REFERENCES "raffleRewards"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffleEntries" ADD CONSTRAINT "raffleEntries_raffleRewardId_fkey" FOREIGN KEY ("raffleRewardId") REFERENCES "raffleRewards"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffleEntries" ADD CONSTRAINT "raffleEntries_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleEntries" ADD CONSTRAINT "raffleEntries_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleEntries" ADD CONSTRAINT "raffleEntries_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "raffleEntries" ADD CONSTRAINT "raffleEntries_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "raffleEntries" ADD CONSTRAINT "raffleEntries_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "raffles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
