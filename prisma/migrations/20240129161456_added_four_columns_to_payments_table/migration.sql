/*
  Warnings:

  - Added the required column `provider_message` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_type` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` ADD COLUMN `provider_message` VARCHAR(191) NOT NULL,
    ADD COLUMN `provider_type` VARCHAR(191) NOT NULL;
