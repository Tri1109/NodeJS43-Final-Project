/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `checkin_date` datetime NOT NULL,
  `checkout_date` datetime NOT NULL,
  `guest_count` int DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Booking_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `Room` (`room_id`),
  CONSTRAINT `Booking_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `room_id` int NOT NULL,
  `comment_date` datetime NOT NULL,
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
  CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `Room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guest_capacity` int DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int DEFAULT NULL,
  `washing_machine` tinyint(1) DEFAULT NULL,
  `iron` tinyint(1) DEFAULT NULL,
  `tv` tinyint(1) DEFAULT NULL,
  `air_conditioner` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `kitchen` tinyint(1) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `pool` tinyint(1) DEFAULT NULL,
  `image` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_id` int NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `Room_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location` (`location_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `User` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Booking` (`booking_id`, `room_id`, `user_id`, `checkin_date`, `checkout_date`, `guest_count`) VALUES
(2, 12, 1, '2024-08-30 15:00:00', '2024-12-30 12:00:00', 1);


INSERT INTO `Comment` (`comment_id`, `user_id`, `room_id`, `comment_date`, `content`, `rating`) VALUES
(3, 1, 9, '2024-09-27 15:03:02', 'ok', 5);


INSERT INTO `Location` (`location_id`, `location_name`, `city`, `country`, `image`) VALUES
(1, 'Quận 1', 'TP HCM', 'Việt Nam', '/imgs/location/1727712385621_quan1.jpg');
INSERT INTO `Location` (`location_id`, `location_name`, `city`, `country`, `image`) VALUES
(2, 'Quận 2', 'TP Hồ Chí Minh', 'Việt Nam', 'string');
INSERT INTO `Location` (`location_id`, `location_name`, `city`, `country`, `image`) VALUES
(3, 'Quận 3', 'TP Hồ Chí Minh', 'Việt Nam', 'string');
INSERT INTO `Location` (`location_id`, `location_name`, `city`, `country`, `image`) VALUES
(4, 'Quận 4', 'TP Hồ Chí Minh', 'Việt Nam', 'string'),
(5, 'Quận 5', 'TP Hồ Chí Minh', 'Việt Nam', 'string'),
(6, 'Quận 6', 'TP Hồ Chí Minh', 'Việt Nam', 'string'),
(7, 'Quận 7', 'TP Hồ Chí Minh', 'Việt Nam', 'string'),
(8, 'Quận 8', 'TP Hồ Chí Minh', 'Việt Nam', 'string'),
(9, 'Quận 9', 'TP Hồ Chí Minh', 'Việt Nam', 'string'),
(10, 'Quận 10', 'TP Hồ Chí Minh', 'Việt Nam', 'string'),
(11, 'Quận 11', 'TP Hồ Chí Minh', 'Việt Nam', 'string'),
(12, 'Quận 12', 'TP Hồ Chí Minh', 'Việt Nam', 'string');

INSERT INTO `Room` (`room_id`, `room_name`, `guest_capacity`, `bedrooms`, `beds`, `bathrooms`, `description`, `price`, `washing_machine`, `iron`, `tv`, `air_conditioner`, `wifi`, `kitchen`, `parking`, `pool`, `image`, `location_id`) VALUES
(9, 'Lux room', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, '/imgs/room/1727712281162_room2.jpg', 2);
INSERT INTO `Room` (`room_id`, `room_name`, `guest_capacity`, `bedrooms`, `beds`, `bathrooms`, `description`, `price`, `washing_machine`, `iron`, `tv`, `air_conditioner`, `wifi`, `kitchen`, `parking`, `pool`, `image`, `location_id`) VALUES
(10, 'Love 2 room', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, '/imgs/room/1727712241095_room1.jpg', 1);
INSERT INTO `Room` (`room_id`, `room_name`, `guest_capacity`, `bedrooms`, `beds`, `bathrooms`, `description`, `price`, `washing_machine`, `iron`, `tv`, `air_conditioner`, `wifi`, `kitchen`, `parking`, `pool`, `image`, `location_id`) VALUES
(11, 'Galaxy room', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 2);
INSERT INTO `Room` (`room_id`, `room_name`, `guest_capacity`, `bedrooms`, `beds`, `bathrooms`, `description`, `price`, `washing_machine`, `iron`, `tv`, `air_conditioner`, `wifi`, `kitchen`, `parking`, `pool`, `image`, `location_id`) VALUES
(12, 'Galaxy 2 room', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 2);

INSERT INTO `User` (`user_id`, `name`, `email`, `password`, `phone_number`, `birth_date`, `gender`, `role`) VALUES
(1, 'Thanh Trí', 'thothanhtri1996@gmail.com', '$2b$10$i7UkmIBwHzc5sMtzbpeVRO7gUURHFpsb37rV9mnjHE1rs/Xu1WHte', '123456789', '11-09-1996', 'male', 'user');
INSERT INTO `User` (`user_id`, `name`, `email`, `password`, `phone_number`, `birth_date`, `gender`, `role`) VALUES
(3, 'Tri', 'thothanhtri1109@gmail.com', '$2b$10$BEKS/n7HiKEnYbvZkAqS..S6m/XVSJ5qUUyieUFZEZPiaqn57Y79S', '123456789', '11/09/1996', 'Male', 'user');
INSERT INTO `User` (`user_id`, `name`, `email`, `password`, `phone_number`, `birth_date`, `gender`, `role`) VALUES
(4, 'Sơn Tùng MTP', 'sontungmtp@gmail.com', '$2b$10$yAw0SjOGSaQVWpWs4J082O2efa0FQ5azXv6TzNWfzLLM6zayI9jE6', '123456789', 'string', 'male', 'user');
INSERT INTO `User` (`user_id`, `name`, `email`, `password`, `phone_number`, `birth_date`, `gender`, `role`) VALUES
(6, 'Hiếu Thứ Hai', 'hieuthuhai@gmail.com', '$2b$10$CWffAl0o10tQLJnm4MxWqeQSSWJ84yCGqSvc4ybdUDcY9qAFN.Z8m', '123456789', 'string', 'string', 'user'),
(7, 'Tlinh123', 'tlinh@gmail.com', '$2b$10$ea9VQOAZab1yHr4u0Rd74eZ5dsUFG0X08kjmz5RqrAEdMegovTXSO', '321654', 'string', 'female', 'user');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;