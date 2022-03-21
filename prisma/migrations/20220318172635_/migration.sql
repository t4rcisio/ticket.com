/*
  Warnings:

  - You are about to drop the column `date` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `MovieId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RoomId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SessionDate` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_roomId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "date",
DROP COLUMN "movieId",
DROP COLUMN "roomId",
ADD COLUMN     "MovieId" TEXT NOT NULL,
ADD COLUMN     "RoomId" TEXT NOT NULL,
ADD COLUMN     "SessionDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_MovieId_fkey" FOREIGN KEY ("MovieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
