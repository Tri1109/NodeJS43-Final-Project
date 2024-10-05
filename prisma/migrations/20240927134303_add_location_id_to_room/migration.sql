/*
  Warnings:

  - Added the required column `location_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Room` ADD COLUMN `location_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `location_id` ON `Room`(`location_id`);

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`location_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
