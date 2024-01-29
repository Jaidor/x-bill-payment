/*
  Warnings:

  - You are about to alter the column `book_source_id` on the `Books` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Books` MODIFY `book_source_id` INTEGER NOT NULL;
