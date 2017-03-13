/*
Navicat MySQL Data Transfer

Source Server         : cesy
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : mygd

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-03-13 17:35:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for association_info
-- ----------------------------
DROP TABLE IF EXISTS `association_info`;
CREATE TABLE `association_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `leader` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `album` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of association_info
-- ----------------------------
INSERT INTO `association_info` VALUES ('1', '乒乓球社', '乒乓球', 'cesyzhao', '这是一个为乒乓而存在的社团', null);
INSERT INTO `association_info` VALUES ('2', '篮球社', '篮球', 'cesyzhao', '大家一起打篮球', null);

-- ----------------------------
-- Table structure for association_user_info
-- ----------------------------
DROP TABLE IF EXISTS `association_user_info`;
CREATE TABLE `association_user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_id` int(11) DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `a_id` (`a_id`),
  CONSTRAINT `association_user_info_ibfk_1` FOREIGN KEY (`a_id`) REFERENCES `association_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of association_user_info
-- ----------------------------
INSERT INTO `association_user_info` VALUES ('1', '1', '1');
INSERT INTO `association_user_info` VALUES ('2', '2', '1');

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
