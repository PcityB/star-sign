/*
  Warnings:

  - You are about to drop the column `currentLocation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `locationOfBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_latitude_longitude_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "currentLocation",
DROP COLUMN "latitude",
DROP COLUMN "locationOfBirth",
DROP COLUMN "longitude",
ADD COLUMN     "birthCity" TEXT,
ADD COLUMN     "birthCountry" TEXT,
ADD COLUMN     "birthLatitude" TEXT,
ADD COLUMN     "birthLongitude" TEXT,
ADD COLUMN     "currentCity" TEXT,
ADD COLUMN     "currentCountry" TEXT;
