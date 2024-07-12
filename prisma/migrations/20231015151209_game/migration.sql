/*
  Warnings:

  - You are about to drop the column `value` on the `items` table. All the data in the column will be lost.
  - Made the column `applicationId` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_applicationId_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "value";

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "applicationId" SET NOT NULL;

-- CreateTable
CREATE TABLE "gameCharacterSkills" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameCharacterSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCharacterAbilities" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameCharacterAbilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCharacters" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameCharacters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemAttributes" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemMaterials" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemSets" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemSets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemSlots" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemSlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemRarities" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemRarities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemTypes" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemSubTypes" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemSubTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemSpecificTypes" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemSpecificTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemAffixes" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemAffixes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameRecipes" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameRecipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameItemSkins" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameItemSkins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameAchievements" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameAchievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameStashes" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameStashes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameBiomes" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameBiomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gamePlanets" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gamePlanets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameSolarSystems" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameSolarSystems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameUniverses" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameUniverses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameStars" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameStars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameAreas" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameAreas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameActs" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameActs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCharacterClasses" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameCharacterClasses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCharacterGenders" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameCharacterGenders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCharacterPersonalities" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameCharacterPersonalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCharacterTitles" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameCharacterTitles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameFactions" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameFactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameEras" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameEras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameSeasons" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameSeasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameLores" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameLores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameEnergies" (
    "id" UUID NOT NULL,
    "key" VARCHAR(40) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "applicationId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameEnergies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacterSkills" ADD CONSTRAINT "gameCharacterSkills_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterSkills" ADD CONSTRAINT "gameCharacterSkills_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterSkills" ADD CONSTRAINT "gameCharacterSkills_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterSkills" ADD CONSTRAINT "gameCharacterSkills_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacterAbilities" ADD CONSTRAINT "gameCharacterAbilities_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterAbilities" ADD CONSTRAINT "gameCharacterAbilities_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterAbilities" ADD CONSTRAINT "gameCharacterAbilities_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterAbilities" ADD CONSTRAINT "gameCharacterAbilities_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacters" ADD CONSTRAINT "gameCharacters_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacters" ADD CONSTRAINT "gameCharacters_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacters" ADD CONSTRAINT "gameCharacters_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacters" ADD CONSTRAINT "gameCharacters_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemAttributes" ADD CONSTRAINT "gameItemAttributes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemAttributes" ADD CONSTRAINT "gameItemAttributes_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemAttributes" ADD CONSTRAINT "gameItemAttributes_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemAttributes" ADD CONSTRAINT "gameItemAttributes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemMaterials" ADD CONSTRAINT "gameItemMaterials_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemMaterials" ADD CONSTRAINT "gameItemMaterials_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemMaterials" ADD CONSTRAINT "gameItemMaterials_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemMaterials" ADD CONSTRAINT "gameItemMaterials_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemSets" ADD CONSTRAINT "gameItemSets_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSets" ADD CONSTRAINT "gameItemSets_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSets" ADD CONSTRAINT "gameItemSets_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSets" ADD CONSTRAINT "gameItemSets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemSlots" ADD CONSTRAINT "gameItemSlots_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSlots" ADD CONSTRAINT "gameItemSlots_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSlots" ADD CONSTRAINT "gameItemSlots_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSlots" ADD CONSTRAINT "gameItemSlots_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemRarities" ADD CONSTRAINT "gameItemRarities_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemRarities" ADD CONSTRAINT "gameItemRarities_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemRarities" ADD CONSTRAINT "gameItemRarities_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemRarities" ADD CONSTRAINT "gameItemRarities_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemTypes" ADD CONSTRAINT "gameItemTypes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemTypes" ADD CONSTRAINT "gameItemTypes_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemTypes" ADD CONSTRAINT "gameItemTypes_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemTypes" ADD CONSTRAINT "gameItemTypes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemSubTypes" ADD CONSTRAINT "gameItemSubTypes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSubTypes" ADD CONSTRAINT "gameItemSubTypes_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSubTypes" ADD CONSTRAINT "gameItemSubTypes_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSubTypes" ADD CONSTRAINT "gameItemSubTypes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemSpecificTypes" ADD CONSTRAINT "gameItemSpecificTypes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSpecificTypes" ADD CONSTRAINT "gameItemSpecificTypes_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSpecificTypes" ADD CONSTRAINT "gameItemSpecificTypes_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSpecificTypes" ADD CONSTRAINT "gameItemSpecificTypes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemAffixes" ADD CONSTRAINT "gameItemAffixes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemAffixes" ADD CONSTRAINT "gameItemAffixes_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemAffixes" ADD CONSTRAINT "gameItemAffixes_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemAffixes" ADD CONSTRAINT "gameItemAffixes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameRecipes" ADD CONSTRAINT "gameRecipes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameRecipes" ADD CONSTRAINT "gameRecipes_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameRecipes" ADD CONSTRAINT "gameRecipes_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameRecipes" ADD CONSTRAINT "gameRecipes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameItemSkins" ADD CONSTRAINT "gameItemSkins_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSkins" ADD CONSTRAINT "gameItemSkins_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSkins" ADD CONSTRAINT "gameItemSkins_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameItemSkins" ADD CONSTRAINT "gameItemSkins_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameAchievements" ADD CONSTRAINT "gameAchievements_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameAchievements" ADD CONSTRAINT "gameAchievements_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameAchievements" ADD CONSTRAINT "gameAchievements_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameAchievements" ADD CONSTRAINT "gameAchievements_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameStashes" ADD CONSTRAINT "gameStashes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameStashes" ADD CONSTRAINT "gameStashes_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameStashes" ADD CONSTRAINT "gameStashes_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameStashes" ADD CONSTRAINT "gameStashes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameBiomes" ADD CONSTRAINT "gameBiomes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameBiomes" ADD CONSTRAINT "gameBiomes_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameBiomes" ADD CONSTRAINT "gameBiomes_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameBiomes" ADD CONSTRAINT "gameBiomes_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gamePlanets" ADD CONSTRAINT "gamePlanets_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gamePlanets" ADD CONSTRAINT "gamePlanets_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gamePlanets" ADD CONSTRAINT "gamePlanets_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gamePlanets" ADD CONSTRAINT "gamePlanets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameSolarSystems" ADD CONSTRAINT "gameSolarSystems_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameSolarSystems" ADD CONSTRAINT "gameSolarSystems_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameSolarSystems" ADD CONSTRAINT "gameSolarSystems_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameSolarSystems" ADD CONSTRAINT "gameSolarSystems_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameUniverses" ADD CONSTRAINT "gameUniverses_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameUniverses" ADD CONSTRAINT "gameUniverses_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameUniverses" ADD CONSTRAINT "gameUniverses_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameUniverses" ADD CONSTRAINT "gameUniverses_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameStars" ADD CONSTRAINT "gameStars_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameStars" ADD CONSTRAINT "gameStars_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameStars" ADD CONSTRAINT "gameStars_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameStars" ADD CONSTRAINT "gameStars_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameAreas" ADD CONSTRAINT "gameAreas_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameAreas" ADD CONSTRAINT "gameAreas_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameAreas" ADD CONSTRAINT "gameAreas_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameAreas" ADD CONSTRAINT "gameAreas_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameActs" ADD CONSTRAINT "gameActs_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameActs" ADD CONSTRAINT "gameActs_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameActs" ADD CONSTRAINT "gameActs_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameActs" ADD CONSTRAINT "gameActs_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacterClasses" ADD CONSTRAINT "gameCharacterClasses_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterClasses" ADD CONSTRAINT "gameCharacterClasses_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterClasses" ADD CONSTRAINT "gameCharacterClasses_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterClasses" ADD CONSTRAINT "gameCharacterClasses_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacterGenders" ADD CONSTRAINT "gameCharacterGenders_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterGenders" ADD CONSTRAINT "gameCharacterGenders_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterGenders" ADD CONSTRAINT "gameCharacterGenders_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterGenders" ADD CONSTRAINT "gameCharacterGenders_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacterPersonalities" ADD CONSTRAINT "gameCharacterPersonalities_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterPersonalities" ADD CONSTRAINT "gameCharacterPersonalities_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterPersonalities" ADD CONSTRAINT "gameCharacterPersonalities_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterPersonalities" ADD CONSTRAINT "gameCharacterPersonalities_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameCharacterTitles" ADD CONSTRAINT "gameCharacterTitles_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterTitles" ADD CONSTRAINT "gameCharacterTitles_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterTitles" ADD CONSTRAINT "gameCharacterTitles_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameCharacterTitles" ADD CONSTRAINT "gameCharacterTitles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameFactions" ADD CONSTRAINT "gameFactions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameFactions" ADD CONSTRAINT "gameFactions_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameFactions" ADD CONSTRAINT "gameFactions_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameFactions" ADD CONSTRAINT "gameFactions_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameEras" ADD CONSTRAINT "gameEras_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameEras" ADD CONSTRAINT "gameEras_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameEras" ADD CONSTRAINT "gameEras_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameEras" ADD CONSTRAINT "gameEras_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameSeasons" ADD CONSTRAINT "gameSeasons_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameSeasons" ADD CONSTRAINT "gameSeasons_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameSeasons" ADD CONSTRAINT "gameSeasons_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameSeasons" ADD CONSTRAINT "gameSeasons_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameLores" ADD CONSTRAINT "gameLores_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameLores" ADD CONSTRAINT "gameLores_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameLores" ADD CONSTRAINT "gameLores_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameLores" ADD CONSTRAINT "gameLores_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameEnergies" ADD CONSTRAINT "gameEnergies_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameEnergies" ADD CONSTRAINT "gameEnergies_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameEnergies" ADD CONSTRAINT "gameEnergies_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameEnergies" ADD CONSTRAINT "gameEnergies_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
