/*
  Warnings:

  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Preference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PreferenceGoals" DROP CONSTRAINT "_PreferenceGoals_A_fkey";

-- DropForeignKey
ALTER TABLE "_PreferenceGoals" DROP CONSTRAINT "_PreferenceGoals_B_fkey";

-- DropForeignKey
ALTER TABLE "_PreferenceInterests" DROP CONSTRAINT "_PreferenceInterests_A_fkey";

-- DropForeignKey
ALTER TABLE "_PreferenceInterests" DROP CONSTRAINT "_PreferenceInterests_B_fkey";

-- DropTable
DROP TABLE "Goal";

-- DropTable
DROP TABLE "Interest";

-- DropTable
DROP TABLE "Preference";

-- CreateTable
CREATE TABLE "preferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "currentCity" TEXT,
    "currentCountry" TEXT,
    "gender" "Gender",
    "sunSign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "preferences_userId_key" ON "preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "goals_name_key" ON "goals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "interests_name_key" ON "interests"("name");

-- AddForeignKey
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreferenceGoals" ADD CONSTRAINT "_PreferenceGoals_A_fkey" FOREIGN KEY ("A") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreferenceGoals" ADD CONSTRAINT "_PreferenceGoals_B_fkey" FOREIGN KEY ("B") REFERENCES "preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreferenceInterests" ADD CONSTRAINT "_PreferenceInterests_A_fkey" FOREIGN KEY ("A") REFERENCES "interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreferenceInterests" ADD CONSTRAINT "_PreferenceInterests_B_fkey" FOREIGN KEY ("B") REFERENCES "preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
