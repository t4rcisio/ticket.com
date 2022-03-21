/*
  Warnings:

  - The values [ASSOCIATED] on the enum `availability` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `Seat` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "availability_new" AS ENUM ('EVERYONE', 'BIRTHDAY', 'USER', 'SESSION', 'MOVIE');
ALTER TABLE "Discount" ALTER COLUMN "Availibity" DROP DEFAULT;
ALTER TABLE "Discount" ALTER COLUMN "Availibity" TYPE "availability_new" USING ("Availibity"::text::"availability_new");
ALTER TYPE "availability" RENAME TO "availability_old";
ALTER TYPE "availability_new" RENAME TO "availability";
DROP TYPE "availability_old";
ALTER TABLE "Discount" ALTER COLUMN "Availibity" SET DEFAULT 'EVERYONE';
COMMIT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "Seat" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Rules" DROP NOT NULL;
