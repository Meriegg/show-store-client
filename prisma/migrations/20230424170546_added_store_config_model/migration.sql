-- CreateTable
CREATE TABLE "storeConfig" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "shippingPrice" DOUBLE PRECISION NOT NULL,
    "homeHorizontalListItems" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "storeConfig_pkey" PRIMARY KEY ("id")
);
