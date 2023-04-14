/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken]` on the table `adminSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "adminSession_sessionToken_key" ON "adminSession"("sessionToken");
