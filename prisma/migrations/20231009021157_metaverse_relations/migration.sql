-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "metaverseId" UUID;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
