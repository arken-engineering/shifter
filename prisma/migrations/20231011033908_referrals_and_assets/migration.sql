/*
  Warnings:

  - You are about to drop the column `key` on the `tokens` table. All the data in the column will be lost.
  - Made the column `name` on table `achievements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `achievements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `achievements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `achievements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `assets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `assets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `badges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `badges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `battlepasses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `battlepasses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `battlepasses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `bounties` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `bounties` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `bounties` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `collections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `collections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `collections` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `communities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `communities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `communities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `discussions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `discussions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `discussions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `exchanges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `exchanges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `exchanges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `forms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `forms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `ideas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `ideas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `ideas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `ideas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `leaderboards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `leaderboards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `leaderboards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `licenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `licenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `licenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `marketPairs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `marketPairs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `marketPairs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `markets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `markets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `markets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `metaverses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `offers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `offers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `offers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `realms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `realms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `realms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `recordUpdates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `servers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `servers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `servers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `stats` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `suggestions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `suggestions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `suggestions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `tags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `tags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `tags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `teams` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `symbol` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `tournaments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `tournaments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `tournaments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `tradeIdeas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `tradeIdeas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `tradeIdeas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `trades` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `trades` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerId` on table `trades` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `votes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `votes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "assets" DROP CONSTRAINT "assets_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "badges" DROP CONSTRAINT "badges_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "battlepasses" DROP CONSTRAINT "battlepasses_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "bounties" DROP CONSTRAINT "bounties_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "communities" DROP CONSTRAINT "communities_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "discussions" DROP CONSTRAINT "discussions_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "discussions" DROP CONSTRAINT "discussions_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "exchanges" DROP CONSTRAINT "exchanges_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "ideas" DROP CONSTRAINT "ideas_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ideas" DROP CONSTRAINT "ideas_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "leaderboards" DROP CONSTRAINT "leaderboards_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "licenses" DROP CONSTRAINT "licenses_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "marketPairs" DROP CONSTRAINT "marketPairs_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "markets" DROP CONSTRAINT "markets_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "metaverses" DROP CONSTRAINT "metaverses_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "realms" DROP CONSTRAINT "realms_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "recordUpdates" DROP CONSTRAINT "recordUpdates_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "servers" DROP CONSTRAINT "servers_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "stats" DROP CONSTRAINT "stats_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "suggestions" DROP CONSTRAINT "suggestions_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "suggestions" DROP CONSTRAINT "suggestions_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "tournaments" DROP CONSTRAINT "tournaments_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "tradeIdeas" DROP CONSTRAINT "tradeIdeas_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "tradeIdeas" DROP CONSTRAINT "tradeIdeas_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "trades" DROP CONSTRAINT "trades_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_applicationId_fkey";

-- DropIndex
DROP INDEX "tokens_key_idx";

-- AlterTable
ALTER TABLE "achievements" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "assets" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "badges" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "battlepasses" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "bounties" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "characters" ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "collections" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "communities" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "discussions" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "exchanges" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "files" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "forms" ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ideas" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "leaderboards" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "licenses" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "logs" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "marketPairs" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "markets" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "metaverses" ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "offers" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "realms" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "recordUpdates" ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "servers" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "stats" ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "suggestions" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "teams" ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "key",
ADD COLUMN     "symbol" VARCHAR(100) NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "tournaments" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "tradeIdeas" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "trades" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL,
ALTER COLUMN "ownerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "votes" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "applicationId" SET NOT NULL;

-- CreateTable
CREATE TABLE "assetsOnProfiles" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "assetId" UUID NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'active',

    CONSTRAINT "assetsOnProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" UUID NOT NULL,
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'active',
    "applicationId" UUID NOT NULL,
    "recipientId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assetsOnProfiles_profileId_assetId_idx" ON "assetsOnProfiles"("profileId", "assetId");

-- CreateIndex
CREATE INDEX "referrals_deletedAt_idx" ON "referrals"("deletedAt");

-- CreateIndex
CREATE INDEX "referrals_status_idx" ON "referrals"("status");

-- CreateIndex
CREATE INDEX "referrals_createdAt_updatedAt_idx" ON "referrals"("createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "tokens_symbol_idx" ON "tokens"("symbol");

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assetsOnProfiles" ADD CONSTRAINT "assetsOnProfiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assetsOnProfiles" ADD CONSTRAINT "assetsOnProfiles_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "battlepasses" ADD CONSTRAINT "battlepasses_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bounties" ADD CONSTRAINT "bounties_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exchanges" ADD CONSTRAINT "exchanges_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "leaderboards" ADD CONSTRAINT "leaderboards_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marketPairs" ADD CONSTRAINT "marketPairs_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "markets" ADD CONSTRAINT "markets_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realms" ADD CONSTRAINT "realms_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tradeIdeas" ADD CONSTRAINT "tradeIdeas_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tradeIdeas" ADD CONSTRAINT "tradeIdeas_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recordUpdates" ADD CONSTRAINT "recordUpdates_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "metaverses" ADD CONSTRAINT "metaverses_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
