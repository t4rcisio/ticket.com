/*
  Warnings:

  - Added the required column `discountId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rules` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "availability" AS ENUM ('EVERYONE', 'BIRTHDAY', 'ASSOCIATED');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "discountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Rules" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Name" TEXT NOT NULL,
    "Discount" DOUBLE PRECISION NOT NULL,
    "Begin_date" TIMESTAMP(3) NOT NULL,
    "End_date" TIMESTAMP(3) NOT NULL,
    "Availibity" "availability" NOT NULL DEFAULT E'EVERYONE',
    "id_associated" TEXT[],

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discount_Name_key" ON "Discount"("Name");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "Discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
