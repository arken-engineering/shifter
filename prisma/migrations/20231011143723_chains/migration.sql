/*
  Warnings:

  - You are about to drop the column `chain` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "chain",
ADD COLUMN     "chainId" UUID;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE SET NULL ON UPDATE CASCADE;
