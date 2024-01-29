/*
  Warnings:

  - You are about to alter the column `book_balance` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Decimal(40,6)` to `Decimal(40,4)`.
  - You are about to alter the column `book_recon_amount` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Decimal(40,6)` to `Decimal(40,4)`.
  - You are about to alter the column `commission_amount` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(40,6)` to `Decimal(40,4)`.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `book_balance` DECIMAL(40, 4) NOT NULL,
    MODIFY `book_recon_amount` DECIMAL(40, 4) NOT NULL;

-- AlterTable
ALTER TABLE `payments` MODIFY `commission_amount` DECIMAL(40, 4) NOT NULL;
