/*
  Warnings:

  - You are about to drop the column `title` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `gameCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `gameTeams` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `metaverses` table. All the data in the column will be lost.
  - Added the required column `name` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `gameCharacters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `gameTeams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "gameBiomes" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameCharacterAbilities" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameCharacterSkills" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameCharacters" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "gameItemAffixes" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameItemAttributes" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameItemMaterials" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameItemRarities" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameItemSets" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameItemSlots" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameItemSpecificTypes" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameItemSubTypes" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameItemTypes" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gamePlanets" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameRecipes" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "gameTeams" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "metaverses" DROP COLUMN "title",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" VARCHAR(100) NOT NULL DEFAULT '';
