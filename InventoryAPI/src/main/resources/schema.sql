--DROP DATABASE IF EXISTS Inventory;
--
--CREATE DATABASE Inventory;
--
--USE DATABASE Inventory;

DROP TABLE IF EXISTS `store`;

CREATE TABLE `store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pname` varchar(100) NOT NULL,
  `model` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `partnumber` varchar(45) DEFAULT NULL,
  `category` varchar(45) NOT NULL,
  `cost` varchar(45) DEFAULT NULL,
  `instock` varchar(45) DEFAULT NULL,
  `sold` varchar(45) DEFAULT NULL,
  `notes` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
);