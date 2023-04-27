-- CreateEnum
CREATE TYPE "StoreVarTypes" AS ENUM ('shipping_cost', 'supported_currencies');

-- CreateTable
CREATE TABLE "storeVars" (
    "id" TEXT NOT NULL,
    "varType" "StoreVarTypes" NOT NULL,
    "numValue" DOUBLE PRECISION,
    "stringValue" TEXT,

    CONSTRAINT "storeVars_pkey" PRIMARY KEY ("id")
);
