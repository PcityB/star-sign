-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "userId1" INTEGER NOT NULL,
    "userId2" INTEGER NOT NULL,
    "synastryScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "matches_userId1_userId2_idx" ON "matches"("userId1", "userId2");

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
