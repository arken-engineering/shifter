/*
  Warnings:

  - You are about to drop the column `value` on the `achievements` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameActs` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameAreas` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameBiomes` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameCharacterAbilities` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameCharacterClasses` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameCharacterGenders` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameCharacterPersonalities` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameCharacterSkills` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameCharacterTitles` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `gameCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameEnergies` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameEras` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameFactions` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemAffixes` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemAttributes` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemMaterials` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemRarities` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemSets` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemSkins` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemSlots` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemSpecificTypes` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemSubTypes` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameItemTypes` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameLores` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gamePlanets` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameRecipes` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameSeasons` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameSolarSystems` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameStars` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameStashes` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `gameUniverses` table. All the data in the column will be lost.
  - You are about to drop the `characters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `charactersOnTeams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gameAchievements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itemsOnProfiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `metaverseId` to the `gameActs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameAreas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameBiomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameCharacterAbilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameCharacterClasses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameCharacterGenders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameCharacterPersonalities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameCharacterSkills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameCharacterTitles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameCharacters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `gameCharacters` table without a default value. This is not possible if the table is not empty.
  - Made the column `ownerId` on table `gameCharacters` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `metaverseId` to the `gameEnergies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameEras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameFactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemAffixes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemAttributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemMaterials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemRarities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemSets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemSkins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemSlots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemSpecificTypes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemSubTypes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameItemTypes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameLores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gamePlanets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameRecipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameSeasons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameSolarSystems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameStars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameStashes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metaverseId` to the `gameUniverses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_createdById_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_editedById_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "charactersOnTeams" DROP CONSTRAINT "charactersOnTeams_characterId_fkey";

-- DropForeignKey
ALTER TABLE "charactersOnTeams" DROP CONSTRAINT "charactersOnTeams_teamId_fkey";

-- DropForeignKey
ALTER TABLE "gameAchievements" DROP CONSTRAINT "gameAchievements_createdById_fkey";

-- DropForeignKey
ALTER TABLE "gameAchievements" DROP CONSTRAINT "gameAchievements_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "gameAchievements" DROP CONSTRAINT "gameAchievements_editedById_fkey";

-- DropForeignKey
ALTER TABLE "gameAchievements" DROP CONSTRAINT "gameAchievements_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "gameCharacters" DROP CONSTRAINT "gameCharacters_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "itemsOnProfiles" DROP CONSTRAINT "itemsOnProfiles_itemId_fkey";

-- DropForeignKey
ALTER TABLE "itemsOnProfiles" DROP CONSTRAINT "itemsOnProfiles_profileId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_createdById_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_editedById_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_ownerId_fkey";

-- AlterTable
ALTER TABLE "achievements" DROP COLUMN "value",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameActs" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameAreas" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameBiomes" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameCharacterAbilities" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameCharacterClasses" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameCharacterGenders" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameCharacterPersonalities" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameCharacterSkills" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameCharacterTitles" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameCharacters" DROP COLUMN "applicationId",
DROP COLUMN "name",
ADD COLUMN     "metaverseId" UUID NOT NULL,
ADD COLUMN     "ratingId" UUID,
ADD COLUMN     "title" VARCHAR(40) NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "gameEnergies" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameEras" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameFactions" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemAffixes" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemAttributes" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemMaterials" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemRarities" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemSets" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemSkins" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemSlots" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemSpecificTypes" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemSubTypes" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameItemTypes" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameLores" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gamePlanets" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameRecipes" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameSeasons" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameSolarSystems" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameStars" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameStashes" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameUniverses" DROP COLUMN "applicationId",
ADD COLUMN     "metaverseId" UUID NOT NULL;

-- DropTable
DROP TABLE "characters";

-- DropTable
DROP TABLE "charactersOnTeams";

-- DropTable
DROP TABLE "gameAchievements";

-- DropTable
DROP TABLE "itemsOnProfiles";

-- DropTable
DROP TABLE "teams";

-- CreateTable
CREATE TABLE "gameItemsOnProfiles" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'active',

    CONSTRAINT "gameItemsOnProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCharactersOnTeams" (
    "id" UUID NOT NULL,
    "teamId" UUID NOT NULL,
    "characterId" UUID NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'active',

    CONSTRAINT "gameCharactersOnTeams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameTeams" (
    "id" UUID NOT NULL,
    "metaverseId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "ratingId" UUID,
    "key" VARCHAR(40) NOT NULL,
    "title" VARCHAR(40) NOT NULL,
    "description" TEXT,
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameTeams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "gameItemsOnProfiles_profileId_itemId_idx" ON "gameItemsOnProfiles"("profileId", "itemId");

-- CreateIndex
CREATE INDEX "gameCharactersOnTeams_teamId_characterId_idx" ON "gameCharactersOnTeams"("teamId", "characterId");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gameItemsOnProfiles" ADD CONSTRAINT "gameItemsOnProfiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gameItemsOnProfiles" ADD CONSTRAINT "gameItemsOnProfiles_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacters" ADD CONSTRAINT "gameCharacters_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacters" ADD CONSTRAINT "gameCharacters_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharactersOnTeams" ADD CONSTRAINT "gameCharactersOnTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "gameTeams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gameCharactersOnTeams" ADD CONSTRAINT "gameCharactersOnTeams_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "gameCharacters"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameTeams" ADD CONSTRAINT "gameTeams_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameTeams" ADD CONSTRAINT "gameTeams_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameTeams" ADD CONSTRAINT "gameTeams_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameTeams" ADD CONSTRAINT "gameTeams_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameTeams" ADD CONSTRAINT "gameTeams_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
