-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` VARCHAR(191) NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `amount` DECIMAL(40, 4) NOT NULL,
    `commission_amount` DECIMAL(40, 6) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `received_from` VARCHAR(191) NOT NULL,
    `paid_to` VARCHAR(191) NOT NULL,
    `currency_id` INTEGER NOT NULL,
    `ledger` VARCHAR(191) NOT NULL,
    `reversal` VARCHAR(191) NOT NULL,
    `status` ENUM('PAID', 'PENDING', 'PROCESSING', 'FAILED', 'DECLINED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
