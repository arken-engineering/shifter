-- AddForeignKey
ALTER TABLE "gameAreaLandmarks" ADD CONSTRAINT "gameAreaLandmarks_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "gameAreas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
