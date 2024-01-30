-- AlterTable
ALTER TABLE `payments` MODIFY `ledger` VARCHAR(1000) NOT NULL,
    MODIFY `reversal` VARCHAR(1000) NOT NULL;
