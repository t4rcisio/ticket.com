/*
  Warnings:

  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_` on the `Movie` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Movie_id__key";

-- DropIndex
DROP INDEX "User_id__key";

-- AlterTable
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_pkey",
DROP COLUMN "id_",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Movie_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Movie_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id_",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";
