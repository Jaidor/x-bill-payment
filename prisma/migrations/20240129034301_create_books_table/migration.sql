-- CreateTable
CREATE TABLE `Books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_source_id` VARCHAR(191) NOT NULL,
    `book_type` VARCHAR(191) NOT NULL,
    `book_balance` DECIMAL(65, 30) NOT NULL DEFAULT 0.00000,
    `book_status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
