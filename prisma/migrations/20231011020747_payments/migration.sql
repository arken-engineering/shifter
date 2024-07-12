/*
  Warnings:

  - You are about to drop the `paymentRequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "paymentRequests" DROP CONSTRAINT "paymentRequests_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "paymentRequests" DROP CONSTRAINT "paymentRequests_createdById_fkey";

-- DropForeignKey
ALTER TABLE "paymentRequests" DROP CONSTRAINT "paymentRequests_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "paymentRequests" DROP CONSTRAINT "paymentRequests_editedById_fkey";

-- DropTable
DROP TABLE "paymentRequests";

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100),
    "key" VARCHAR(100),
    "value" TEXT,
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) DEFAULT 'active',
    "applicationId" UUID,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payments_deletedAt_idx" ON "payments"("deletedAt");

-- CreateIndex
CREATE INDEX "payments_key_idx" ON "payments"("key");

-- CreateIndex
CREATE INDEX "payments_name_idx" ON "payments"("name");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_createdAt_updatedAt_idx" ON "payments"("createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;
