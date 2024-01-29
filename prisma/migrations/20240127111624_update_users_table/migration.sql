/*
  Warnings:

  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `dob` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobile` VARCHAR(191) NOT NULL;
