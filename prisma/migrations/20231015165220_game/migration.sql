-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_ownerId_fkey";

-- AlterTable
ALTER TABLE "achievements" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
