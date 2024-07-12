/*
  Warnings:

  - You are about to drop the column `characterId` on the `gameNpcs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "gameNpcs" DROP CONSTRAINT "gameNpcs_characterId_fkey";

-- AlterTable
ALTER TABLE "gameNpcs" DROP COLUMN "characterId",
ADD COLUMN     "characterRaceId" UUID,
ADD COLUMN     "gameCharacterId" UUID;

-- AddForeignKey
ALTER TABLE "gameNpcs" ADD CONSTRAINT "gameNpcs_characterRaceId_fkey" FOREIGN KEY ("characterRaceId") REFERENCES "gameCharacterRacees"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameNpcs" ADD CONSTRAINT "gameNpcs_gameCharacterId_fkey" FOREIGN KEY ("gameCharacterId") REFERENCES "gameCharacters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
