-- CreateTable
CREATE TABLE "metaverses" (
    "id" UUID NOT NULL,
    "parentId" UUID,
    "applicationId" UUID,
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
    "meta" JSONB NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'new',

    CONSTRAINT "metaverses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "metaverses" ADD CONSTRAINT "metaverses_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "metaverses"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "metaverses" ADD CONSTRAINT "metaverses_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "metaverses" ADD CONSTRAINT "metaverses_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "metaverses" ADD CONSTRAINT "metaverses_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "metaverses" ADD CONSTRAINT "metaverses_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "metaverses" ADD CONSTRAINT "metaverses_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
