/*
Navicat MySQL Data Transfer

Source Server         : cesy
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : mygd

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-03-10 16:46:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `realname` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `hobby` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'cesy', '123456', 'mom\'s name', 'simmon', 'cesy', '21', 'male', '19950823', null, 'pingpong', 'lazy boy');
INSERT INTO `users` VALUES ('3', 'cesyzhao', '1223456', 'test', 'yes', null, null, null, null, null, null, null);
