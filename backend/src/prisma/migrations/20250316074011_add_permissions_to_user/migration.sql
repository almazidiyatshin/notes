-- CreateEnum
CREATE TYPE "EUserPermission" AS ENUM ('ALL', 'BASIC');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "EUserPermission"[];
