-- AlterTable
ALTER TABLE "order" ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deliveredOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
