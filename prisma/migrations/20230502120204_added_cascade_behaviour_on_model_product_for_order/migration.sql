-- DropForeignKey
ALTER TABLE "productForOrder" DROP CONSTRAINT "productForOrder_orderId_fkey";

-- AddForeignKey
ALTER TABLE "productForOrder" ADD CONSTRAINT "productForOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
