-- CreateTable
CREATE TABLE "planetary_positions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sunSign" TEXT NOT NULL,
    "moonSign" TEXT NOT NULL,
    "ascendant" TEXT NOT NULL,
    "sunPosition" TEXT NOT NULL,
    "moonPosition" TEXT NOT NULL,
    "mercury" TEXT NOT NULL,
    "venus" TEXT NOT NULL,
    "mars" TEXT NOT NULL,
    "jupiter" TEXT NOT NULL,
    "saturn" TEXT NOT NULL,
    "uranus" TEXT NOT NULL,
    "neptune" TEXT NOT NULL,
    "pluto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planetary_positions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "planetary_positions" ADD CONSTRAINT "planetary_positions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
