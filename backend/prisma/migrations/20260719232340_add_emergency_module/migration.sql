-- CreateEnum
CREATE TYPE "public"."EmergencyCategory" AS ENUM ('MEDICAL', 'FIRE', 'ACCIDENT', 'BLOOD', 'ANIMAL_RESCUE', 'NATURAL_DISASTER', 'FOOD', 'SHELTER', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EmergencyPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."EmergencyStatus" AS ENUM ('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."EmergencyRequest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."EmergencyCategory" NOT NULL,
    "priority" "public"."EmergencyPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "public"."EmergencyStatus" NOT NULL DEFAULT 'OPEN',
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmergencyRequest_createdById_idx" ON "public"."EmergencyRequest"("createdById");

-- CreateIndex
CREATE INDEX "EmergencyRequest_status_idx" ON "public"."EmergencyRequest"("status");

-- CreateIndex
CREATE INDEX "EmergencyRequest_category_idx" ON "public"."EmergencyRequest"("category");

-- AddForeignKey
ALTER TABLE "public"."EmergencyRequest" ADD CONSTRAINT "EmergencyRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
