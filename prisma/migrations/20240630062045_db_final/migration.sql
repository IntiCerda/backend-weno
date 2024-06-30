/*
  Warnings:

  - You are about to drop the `Requests` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_review` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_service` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_id_booking_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_id_review_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_id_service_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_id_user_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "id_review" TEXT NOT NULL,
ADD COLUMN     "id_service" TEXT NOT NULL,
ADD COLUMN     "id_user" TEXT NOT NULL;

-- DropTable
DROP TABLE "Requests";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_id_review_fkey" FOREIGN KEY ("id_review") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
