-- AlterTable
ALTER TABLE "public"."EmergencyRequest" ADD COLUMN     "assignedAt" TIMESTAMP(3),
ADD COLUMN     "assignedVolunteerId" TEXT,
ADD COLUMN     "resolvedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "EmergencyRequest_assignedVolunteerId_idx" ON "public"."EmergencyRequest"("assignedVolunteerId");

-- AddForeignKey
ALTER TABLE "public"."EmergencyRequest" ADD CONSTRAINT "EmergencyRequest_assignedVolunteerId_fkey" FOREIGN KEY ("assignedVolunteerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
