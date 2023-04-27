/*
  Warnings:

  - The values [paid_online] on the enum `OrderPaymentMode` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `City` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `adressExtras` on the `order` table. All the data in the column will be lost.
  - Added the required column `address` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderPaymentMode_new" AS ENUM ('pay_online', 'pay_on_delivery');
ALTER TABLE "order" ALTER COLUMN "paymentMode" TYPE "OrderPaymentMode_new" USING ("paymentMode"::text::"OrderPaymentMode_new");
ALTER TYPE "OrderPaymentMode" RENAME TO "OrderPaymentMode_old";
ALTER TYPE "OrderPaymentMode_new" RENAME TO "OrderPaymentMode";
DROP TYPE "OrderPaymentMode_old";
COMMIT;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "City",
DROP COLUMN "adress",
DROP COLUMN "adressExtras",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "addressExtras" TEXT,
ADD COLUMN     "city" TEXT NOT NULL;
