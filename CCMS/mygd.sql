/*
Navicat MySQL Data Transfer

Source Server         : cesy
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : mygd

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-03-16 17:46:02
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
  KEY `a_id` (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of association_user_info
-- ----------------------------
INSERT INTO `association_user_info` VALUES ('1', '1', '1');
INSERT INTO `association_user_info` VALUES ('2', '2', '1');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `kind` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '测试新闻', '这是一个测试用的新闻', '2017-03-14 11:17:08', 'hot');
INSERT INTO `news` VALUES ('2', '测试新闻2', '这也是一个测试新闻', '2017-03-15 15:11:24', 'normal');

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
  `user_level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'cesy', '123456', 'mom\'s name', 'simmon', 'cesy', '21', 'male', '19950823', '6a31ceb81bdd2add8e1512865bebd156', 'pingpong', 'lazy boy', 'A');
INSERT INTO `users` VALUES ('3', 'cesyzhao', '1223456', 'test', 'yes', null, null, null, null, null, null, null, 'B');
INSERT INTO `users` VALUES ('4', 'test', '000000', 'test', 'test', null, null, null, null, null, null, null, 'C');
INSERT INTO `users` VALUES ('5', 'zhaosisi', '123456', 'test', 'test', null, null, null, null, null, null, null, null);
INSERT INTO `users` VALUES ('12', 'test1111', '123456', 'test', 'test', null, null, '男', null, null, null, null, null);
INSERT INTO `users` VALUES ('16', 'test2', '111', '111', '111', null, null, '男', null, null, null, null, null);
