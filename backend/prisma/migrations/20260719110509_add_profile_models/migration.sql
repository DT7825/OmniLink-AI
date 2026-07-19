-- CreateTable
CREATE TABLE "public"."VolunteerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skills" TEXT[],
    "availability" TEXT,
    "experience" TEXT,
    "occupation" TEXT,
    "organization" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VolunteerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NGOProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ngoName" TEXT NOT NULL,
    "registrationNo" TEXT,
    "website" TEXT,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NGOProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DonorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "lastDonationDate" TIMESTAMP(3),
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerProfile_userId_key" ON "public"."VolunteerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NGOProfile_userId_key" ON "public"."NGOProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DonorProfile_userId_key" ON "public"."DonorProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."VolunteerProfile" ADD CONSTRAINT "VolunteerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NGOProfile" ADD CONSTRAINT "NGOProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DonorProfile" ADD CONSTRAINT "DonorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
