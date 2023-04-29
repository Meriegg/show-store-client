/*
  Warnings:

  - Changed the type of `timeOfOrderShippingPrice` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "timeOfOrderShippingPrice",
ADD COLUMN     "timeOfOrderShippingPrice" DOUBLE PRECISION NOT NULL;
