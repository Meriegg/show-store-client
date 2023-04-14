/*
  Warnings:

  - You are about to drop the column `hashedUserIP` on the `adminUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adminSession" ADD COLUMN     "hashedUserIP" TEXT;

-- AlterTable
ALTER TABLE "adminUser" DROP COLUMN "hashedUserIP";
