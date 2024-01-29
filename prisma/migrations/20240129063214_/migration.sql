/*
  Warnings:

  - You are about to drop the `Books` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `provider_status` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` ADD COLUMN `provider_status` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Books`;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_source_id` INTEGER NOT NULL,
    `book_type` VARCHAR(191) NOT NULL,
    `book_balance` DECIMAL(40, 6) NOT NULL,
    `book_recon_amount` DECIMAL(40, 6) NOT NULL,
    `book_status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
