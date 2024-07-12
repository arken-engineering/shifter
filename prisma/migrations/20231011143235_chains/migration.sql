/*
  Warnings:

  - Added the required column `chainId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "chainId" UUID;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "chainId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "chains" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "key" VARCHAR(100),
    "value" TEXT,
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) DEFAULT 'active',
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "type" VARCHAR(100),
    "standard" VARCHAR(100),
    "licenseId" UUID,

    CONSTRAINT "chains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chains_deletedAt_idx" ON "chains"("deletedAt");

-- CreateIndex
CREATE INDEX "chains_key_idx" ON "chains"("key");

-- CreateIndex
CREATE INDEX "chains_name_idx" ON "chains"("name");

-- CreateIndex
CREATE INDEX "chains_status_idx" ON "chains"("status");

-- CreateIndex
CREATE INDEX "chains_createdAt_updatedAt_idx" ON "chains"("createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "chains" ADD CONSTRAINT "chains_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chains" ADD CONSTRAINT "chains_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "chains" ADD CONSTRAINT "chains_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "chains" ADD CONSTRAINT "chains_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "chains" ADD CONSTRAINT "chains_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
