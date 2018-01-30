CREATE DATABASE spotting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE spotting;

CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `created` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

INSERT INTO `locations` (`name`, `lat`, `lng`, `userid`, `created`) VALUES
('2463 Sqn HQ', 55.898533, -3.318225, 1, now());

CREATE TABLE `markers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `address` varchar(80) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

CREATE TABLE `observations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qty` varchar(60) NOT NULL,
  `reportingname` varchar(80) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  `bearing` int(11) NOT NULL,
  `time` varchar(7) NOT NULL,
  `osgridref` varchar(14) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
