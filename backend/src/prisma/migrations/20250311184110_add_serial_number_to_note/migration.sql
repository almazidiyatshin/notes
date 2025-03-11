/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Note_serialNumber_key" ON "Note"("serialNumber");
