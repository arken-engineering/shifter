/*
  Warnings:

  - Added the required column `gameId` to the `gameLores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gameGuide" ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "gameLores" ADD COLUMN     "gameId" UUID NOT NULL;
