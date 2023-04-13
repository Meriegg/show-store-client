-- CreateEnum
CREATE TYPE "OrderPaymentMode" AS ENUM ('paid_online', 'pay_on_delivery');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('in_preparation', 'in_shipping', 'delivered');

-- CreateEnum
CREATE TYPE "OrderPaymentStatus" AS ENUM ('paid', 'unpaid');

-- CreateTable
CREATE TABLE "type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "publicPriceNameVerificationKey" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productForOrder" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "productForOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "paymentMode" "OrderPaymentMode" NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'in_preparation',
    "orderPaymentStatus" "OrderPaymentStatus" NOT NULL DEFAULT 'unpaid',

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToType_AB_unique" ON "_ProductToType"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToType_B_index" ON "_ProductToType"("B");

-- AddForeignKey
ALTER TABLE "productForOrder" ADD CONSTRAINT "productForOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToType" ADD CONSTRAINT "_ProductToType_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToType" ADD CONSTRAINT "_ProductToType_B_fkey" FOREIGN KEY ("B") REFERENCES "type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
