-- DropForeignKey
ALTER TABLE "adminSession" DROP CONSTRAINT "adminSession_adminId_fkey";

-- AddForeignKey
ALTER TABLE "adminSession" ADD CONSTRAINT "adminSession_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "adminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
