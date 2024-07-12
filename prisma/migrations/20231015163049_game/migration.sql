/*
  Warnings:

  - You are about to drop the column `gameId` on the `gameLores` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `gameGuide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gameGuide" ADD COLUMN     "gameId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "gameLores" DROP COLUMN "gameId";
