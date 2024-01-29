-- CreateTable
CREATE TABLE `ledgers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ledger_name` VARCHAR(191) NOT NULL,
    `ledger_type` VARCHAR(191) NOT NULL,
    `ledger_percentage_commission` VARCHAR(191) NOT NULL,
    `ledger_currency_id` INTEGER NOT NULL,
    `ledger_status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
