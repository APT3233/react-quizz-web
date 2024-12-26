--            Project: Quiz 
---------------------------------------------------------
-- Host: localhost    Database: apt_web_db_quiz
----------------------------------------------------------
--  OS: Ubuntu 24.04.1 LTS
--  Kernel: 6.8.0-50-generic


-- 
-- Table structure for table `user`
-- 
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `username` VARCHAR(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `role` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 
-- Table structure for table `user_profile`
-- 
DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE `user_profile` (
  `userId` INT,
  `fullName` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `address` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `phoneNumber` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `birthDate` DATE,
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 
-- Table structure for table `user_status`
-- 
DROP TABLE IF EXISTS `user_status`;
CREATE TABLE `user_status` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT,
  `statusCode` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `statusName` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  CONSTRAINT `user_status_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 
-- Table structure for table `topic`
-- 
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 
-- Table structure for table `question`
-- 
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `topicId` INT,
  `question` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `answers` JSON,
  `correctAnswer` INT,
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`topicId`) REFERENCES `topic` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 
-- Table structure for table `user_answer`
-- 
DROP TABLE IF EXISTS `user_answer`;
CREATE TABLE `user_answer` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT,
  `topicId` INT,
  `answers` JSON,
  CONSTRAINT `user_answer_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_answer_ibfk_2` FOREIGN KEY (`topicId`) REFERENCES `topic` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



