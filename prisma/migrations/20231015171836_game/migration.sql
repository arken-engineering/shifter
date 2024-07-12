-- CreateTable
CREATE TABLE "gameNpcs" (
    "id" UUID NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "characterId" UUID NOT NULL,
    "metaverseId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'draft',

    CONSTRAINT "gameNpcs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gameNpcs" ADD CONSTRAINT "gameNpcs_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameNpcs" ADD CONSTRAINT "gameNpcs_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameNpcs" ADD CONSTRAINT "gameNpcs_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameNpcs" ADD CONSTRAINT "gameNpcs_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gameNpcs" ADD CONSTRAINT "gameNpcs_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "gameCharacters"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
