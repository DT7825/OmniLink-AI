-- AlterTable
ALTER TABLE "public"."Notification" ADD COLUMN     "actionUrl" TEXT,
ADD COLUMN     "metadata" JSONB;
