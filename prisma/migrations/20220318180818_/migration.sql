/*
  Warnings:

  - You are about to drop the column `capacibility` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Room` table. All the data in the column will be lost.
  - Added the required column `Capacibility` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Reference` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "capacibility",
DROP COLUMN "identifier",
ADD COLUMN     "Capacibility" INTEGER NOT NULL,
ADD COLUMN     "Reference" TEXT NOT NULL;
