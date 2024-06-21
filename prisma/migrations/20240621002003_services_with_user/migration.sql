/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `Services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Services_id_user_key" ON "Services"("id_user");
