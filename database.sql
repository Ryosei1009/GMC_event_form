CREATE TABLE `event_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizenid` varchar(8) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(60) DEFAULT NULL,
  `is_emote` varchar(15) NOT NULL DEFAULT 0,
  `emote` varchar(15) DEFAULT NULL,
  `is_image` tinyint(1) NOT NULL DEFAULT 0,
  `is_audio` tinyint(1) NOT NULL DEFAULT 0,
  `is_remove` tinyint(1) NOT NULL DEFAULT 0,
  `add_status` varchar(7) NOT NULL DEFAULT 'none',
  `created_at` varchar(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=737 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;