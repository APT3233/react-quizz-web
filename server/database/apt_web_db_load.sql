

INSERT INTO `user` (`username`, `password`, `token`, `role`) VALUES
('admin', 'pwd', 'token1', 'admin'),
('0', '0', 'token2', 'user'),
('user3', 'password3', 'token3', 'user'),
('user4', 'password4', 'token4', 'user'),
('user5', 'password5', 'token5', 'user');

INSERT INTO `user_profile` (`userId`, `fullName`, `description`, `address`, `phoneNumber`, `birthDate`) VALUES
(1, 'User One', 'Description for User One', 'Address One', '1234567890', '1990-01-01'),
(2, 'User Two', 'Description for User Two', 'Address Two', '0987654321', '1991-02-02'),
(3, 'User Three', 'Description for User Three', 'Address Three', '1231231234', '1992-03-03'),
(4, 'User Four', 'Description for User Four', 'Address Four', '3213213210', '1993-04-04'),
(5, 'User Five', 'Description for User Five', 'Address Five', '4564564560', '1994-05-05');

INSERT INTO `user_status` (`userId`, `statusCode`, `statusName`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'active', 'Active', 'User is active', NOW(), NOW()),
(2, 'inactive', 'Inactive', 'User is inactive', NOW(), NOW()),
(3, 'pending', 'Pending', 'User is pending verification', NOW(), NOW()),
(4, 'banned', 'Banned', 'User is banned', NOW(), NOW()),
(5, 'active', 'Active', 'User is active', NOW(), NOW());
