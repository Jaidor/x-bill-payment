-- AlterTable
ALTER TABLE `books` MODIFY `book_balance` DECIMAL(40, 4) NOT NULL DEFAULT 0,
    MODIFY `book_recon_amount` DECIMAL(40, 4) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `payments` MODIFY `amount` DECIMAL(40, 4) NOT NULL DEFAULT 0,
    MODIFY `commission_amount` DECIMAL(40, 4) NOT NULL DEFAULT 0;
