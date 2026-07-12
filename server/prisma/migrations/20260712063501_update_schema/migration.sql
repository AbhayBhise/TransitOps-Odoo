/*
  Warnings:

  - Added the required column `licenseExpiry` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "licenseExpiry" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "cargoWeight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "capacity" DOUBLE PRECISION NOT NULL DEFAULT 0;
