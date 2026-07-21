/*
  Warnings:

  - Added the required column `contactName` to the `EmergencyRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `EmergencyRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."EmergencyRequest" ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "contactPhone" TEXT NOT NULL,
ADD COLUMN     "peopleAffected" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "requiresBlood" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresFood" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresMedicalAid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresShelter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresTransportation" BOOLEAN NOT NULL DEFAULT false;
