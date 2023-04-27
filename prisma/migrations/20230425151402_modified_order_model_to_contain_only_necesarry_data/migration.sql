/*
  Warnings:

  - You are about to drop the column `city` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `regionOrCountry` on the `order` table. All the data in the column will be lost.
  - Added the required column `country` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "city",
DROP COLUMN "regionOrCountry",
ADD COLUMN     "country" TEXT NOT NULL;
