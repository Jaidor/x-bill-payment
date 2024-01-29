-- AlterTable
ALTER TABLE `books` MODIFY `book_type` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `payments` MODIFY `provider_status` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `provider_message` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `provider_type` VARCHAR(191) NOT NULL DEFAULT '';
