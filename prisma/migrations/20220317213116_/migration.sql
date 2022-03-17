-- CreateEnum
CREATE TYPE "Age_rating" AS ENUM ('General_Audiences', 'Parental_Guidance_Suggested', 'Parents_Strongly_Cautioned', 'Restricted', 'Adults_Only');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en_US', 'pt_BR', 'es_ES');

-- CreateEnum
CREATE TYPE "Subtitle" AS ENUM ('none', 'en_US', 'pt_BR', 'es_ES');

-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('USER', 'EDITOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "movieRoom" AS ENUM ('STANDARD', 'IMAX', 'DOLBY');

-- CreateTable
CREATE TABLE "roomSeat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roomSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Duration" INTEGER NOT NULL,
    "Language" "Language" NOT NULL DEFAULT E'pt_BR',
    "Subtitles" "Subtitle" NOT NULL DEFAULT E'none',
    "Age_rating" "Age_rating" NOT NULL DEFAULT E'General_Audiences',

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "identifier" TEXT NOT NULL,
    "category" "movieRoom" NOT NULL DEFAULT E'STANDARD',
    "capacibility" INTEGER NOT NULL,
    "availability" TIMESTAMP(3)[],

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Phone" TEXT,
    "Birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Permissions" "Permissions" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
