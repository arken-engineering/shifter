-- CreateTable
CREATE TABLE "gameGuide" (
    "id" UUID NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "metaverseId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'new',

    CONSTRAINT "gameGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" UUID NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "productId" UUID NOT NULL,
    "metaverseId" UUID NOT NULL,
    "ownerId" UUID,
    "createdById" UUID,
    "editedById" UUID,
    "deletedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),
    "meta" JSONB NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'new',

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gameGuide" ADD CONSTRAINT "gameGuide_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameGuide" ADD CONSTRAINT "gameGuide_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameGuide" ADD CONSTRAINT "gameGuide_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "gameGuide" ADD CONSTRAINT "gameGuide_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_metaverseId_fkey" FOREIGN KEY ("metaverseId") REFERENCES "metaverses"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
