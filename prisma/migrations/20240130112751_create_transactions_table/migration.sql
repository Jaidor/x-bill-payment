-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` VARCHAR(191) NOT NULL,
    `book_id` INTEGER NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(40, 4) NOT NULL DEFAULT 0,
    `balance` DECIMAL(40, 4) NOT NULL DEFAULT 0,
    `ledger_name` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
