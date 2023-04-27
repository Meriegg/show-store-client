/*
  Warnings:

  - Added the required column `City` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNum` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionOrCountry` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `productForOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "adressExtras" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "extraDeliveryNotes" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNum" TEXT NOT NULL,
ADD COLUMN     "regionOrCountry" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "productForOrder" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "productForOrder" ADD CONSTRAINT "productForOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
