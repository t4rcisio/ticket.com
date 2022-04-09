/*
  Warnings:

  - You are about to drop the column `bithday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `permissions` on the `User` table. All the data in the column will be lost.
  - Added the required column `date` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bithday",
DROP COLUMN "permissions",
ADD COLUMN     "Birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Permissions" "Permissions" NOT NULL DEFAULT E'USER';
