/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('local_admin', 'owner');

-- CreateEnum
CREATE TYPE "PasswordType" AS ENUM ('hashed', 'public');

-- CreateTable
CREATE TABLE "adminSession" (
    "id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "publicVerificationKey" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "adminSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hashedUserIP" TEXT,
    "passwordType" "PasswordType" NOT NULL DEFAULT 'hashed',
    "role" "AdminRole" NOT NULL DEFAULT 'local_admin',

    CONSTRAINT "adminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adminSession_publicVerificationKey_key" ON "adminSession"("publicVerificationKey");

-- CreateIndex
CREATE UNIQUE INDEX "adminSession_adminId_key" ON "adminSession"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "adminUser_name_key" ON "adminUser"("name");

-- CreateIndex
CREATE UNIQUE INDEX "type_name_key" ON "type"("name");

-- AddForeignKey
ALTER TABLE "adminSession" ADD CONSTRAINT "adminSession_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "adminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
