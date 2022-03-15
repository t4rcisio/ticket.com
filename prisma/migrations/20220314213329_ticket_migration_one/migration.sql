-- CreateEnum
CREATE TYPE "Age_rating" AS ENUM ('General_Audiences', 'Parental_Guidance_Suggested', 'Parents_Strongly_Cautioned', 'Restricted', 'Adults_Only');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en_US', 'pt_BR', 'es_ES');

-- CreateEnum
CREATE TYPE "Subtitle" AS ENUM ('none', 'en_US', 'pt_BR', 'es_ES');

-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('USER', 'EDITOR', 'ADMIN');

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "id_" TEXT NOT NULL,
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
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "id_" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Phone" TEXT,
    "bithday" TIMESTAMP(3) NOT NULL,
    "permissions" "Permissions" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_id__key" ON "Movie"("id_");

-- CreateIndex
CREATE UNIQUE INDEX "User_id__key" ON "User"("id_");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
