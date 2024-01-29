/*
  Warnings:

  - You are about to drop the column `book_source_id` on the `books` table. All the data in the column will be lost.
  - Added the required column `book_source` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `book_source_id`,
    ADD COLUMN `book_source` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ledgers` MODIFY `ledger_name` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `ledger_type` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `ledger_percentage_commission` VARCHAR(191) NOT NULL DEFAULT '';
