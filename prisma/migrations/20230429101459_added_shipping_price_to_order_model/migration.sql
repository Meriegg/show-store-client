/*
  Warnings:

  - Added the required column `timeOfOrderShippingPrice` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "timeOfOrderShippingPrice" TEXT NOT NULL;
