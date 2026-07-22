-- AlterTable
ALTER TABLE "public"."EmergencyRequest" ADD COLUMN     "assignedNgoId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."EmergencyRequest" ADD CONSTRAINT "EmergencyRequest_assignedNgoId_fkey" FOREIGN KEY ("assignedNgoId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
