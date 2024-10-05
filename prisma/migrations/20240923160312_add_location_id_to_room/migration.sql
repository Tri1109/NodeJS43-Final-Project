-- CreateTable
CREATE TABLE `Booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `checkin_date` DATETIME(0) NOT NULL,
    `checkout_date` DATETIME(0) NOT NULL,
    `guest_count` INTEGER NULL,

    INDEX `room_id`(`room_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `comment_date` DATETIME(0) NOT NULL,
    `content` VARCHAR(1000) NULL,
    `rating` INTEGER NULL,

    INDEX `room_id`(`room_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `location_name` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `image` VARCHAR(1000) NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_name` VARCHAR(255) NOT NULL,
    `guest_capacity` INTEGER NULL,
    `bedrooms` INTEGER NULL,
    `beds` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `description` VARCHAR(1000) NULL,
    `price` INTEGER NULL,
    `washing_machine` BOOLEAN NULL,
    `iron` BOOLEAN NULL,
    `tv` BOOLEAN NULL,
    `air_conditioner` BOOLEAN NULL,
    `wifi` BOOLEAN NULL,
    `kitchen` BOOLEAN NULL,
    `parking` BOOLEAN NULL,
    `pool` BOOLEAN NULL,
    `image` VARCHAR(1000) NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(20) NULL,
    `birth_date` VARCHAR(20) NULL,
    `gender` VARCHAR(10) NULL,
    `role` VARCHAR(50) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
