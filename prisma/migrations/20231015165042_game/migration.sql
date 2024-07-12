-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_metaverseId_fkey";

-- AlterTable
ALTER TABLE "achievements" ALTER COLUMN "metaverseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
