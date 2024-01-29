/*
  Warnings:

  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `country`,
    DROP COLUMN `dob`,
    DROP COLUMN `mobile`;
