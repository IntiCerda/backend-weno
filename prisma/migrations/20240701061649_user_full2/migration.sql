/*
  Warnings:

  - You are about to drop the column `direccion` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidad` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "direccion",
DROP COLUMN "nacionalidad",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "nationality" TEXT;
