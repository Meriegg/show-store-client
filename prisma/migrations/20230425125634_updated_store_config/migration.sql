/*
  Warnings:

  - The `homeHorizontalListItems` column on the `storeConfig` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "storeConfig" DROP COLUMN "homeHorizontalListItems",
ADD COLUMN     "homeHorizontalListItems" TEXT[];
