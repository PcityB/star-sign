/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "birthTimestamp" DROP NOT NULL,
ALTER COLUMN "minAge" DROP NOT NULL,
ALTER COLUMN "maxAge" DROP NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
