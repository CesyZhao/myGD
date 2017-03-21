/*
Navicat MySQL Data Transfer

Source Server         : cesyzhao
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : mygd

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-03-21 17:25:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for apply_association
-- ----------------------------
DROP TABLE IF EXISTS `apply_association`;
CREATE TABLE `apply_association` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply_association
-- ----------------------------
INSERT INTO `apply_association` VALUES ('2', '风起社', '旱冰', '未审核', null);
INSERT INTO `apply_association` VALUES ('3', '风起社', '滑冰', '未审核', null);

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
  `avatar` varchar(255) DEFAULT NULL,
  `founddate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of association_info
-- ----------------------------
INSERT INTO `association_info` VALUES ('1', '时光屋', '摄影', 'cesyzhao', ' 摄影协会是在校团委领导下的学生社团之一，成立于1986年，在成长的过程中，始终坚持“团结，进取，求实，创新”的宗旨，历年均与高分被评为“一级协会”，“十佳社团”。摄影协会现拥有独立的暗房和先进的专业设备收藏了大量的摄影文献资料，此外，摄协还拥有自己的会刊《大学生摄影》，至今已成功发行了十五期，现已并入《肇庆学院青年》报。留住瞬间相遇的幸福，追求多姿多彩的人生！摄影协会将为你提供翱翔的蓝天，摄影协会将是你最佳的选择，摄影协会期待着你的加入。不要再犹豫了，心动不如行动，赶快加入摄协这个温馨的大家庭！', 'default.jpg', '2017-03-21');
INSERT INTO `association_info` VALUES ('2', '篮球社', '篮球', 'cesyzhao', '大家一起打篮球', 'default.jpg', '2017-03-21');
INSERT INTO `association_info` VALUES ('3', '时光屋', '摄影', 'cesyzhao', ' 摄影协会是在校团委领导下的学生社团之一，成立于1986年，在成长的过程中，始终坚持“团结，进取，求实，创新”的宗旨，历年均与高分被评为“一级协会”，“十佳社团”。摄影协会现拥有独立的暗房和先进的专业设备收藏了大量的摄影文献资料，此外，摄协还拥有自己的会刊《大学生摄影》，至今已成功发行了十五期，现已并入《肇庆学院青年》报。留住瞬间相遇的幸福，追求多姿多彩的人生！摄影协会将为你提供翱翔的蓝天，摄影协会将是你最佳的选择，摄影协会期待着你的加入。不要再犹豫了，心动不如行动，赶快加入摄协这个温馨的大家庭！', 'default.jpg', '2017-03-21');
INSERT INTO `association_info` VALUES ('4', '时光屋', '摄影', 'cesyzhao', ' 摄影协会是在校团委领导下的学生社团之一，成立于1986年，在成长的过程中，始终坚持“团结，进取，求实，创新”的宗旨，历年均与高分被评为“一级协会”，“十佳社团”。摄影协会现拥有独立的暗房和先进的专业设备收藏了大量的摄影文献资料，此外，摄协还拥有自己的会刊《大学生摄影》，至今已成功发行了十五期，现已并入《肇庆学院青年》报。留住瞬间相遇的幸福，追求多姿多彩的人生！摄影协会将为你提供翱翔的蓝天，摄影协会将是你最佳的选择，摄影协会期待着你的加入。不要再犹豫了，心动不如行动，赶快加入摄协这个温馨的大家庭！', 'default.jpg', '2017-03-21');
INSERT INTO `association_info` VALUES ('5', '时光屋', '摄影', 'cesyzhao', ' 摄影协会是在校团委领导下的学生社团之一，成立于1986年，在成长的过程中，始终坚持“团结，进取，求实，创新”的宗旨，历年均与高分被评为“一级协会”，“十佳社团”。摄影协会现拥有独立的暗房和先进的专业设备收藏了大量的摄影文献资料，此外，摄协还拥有自己的会刊《大学生摄影》，至今已成功发行了十五期，现已并入《肇庆学院青年》报。留住瞬间相遇的幸福，追求多姿多彩的人生！摄影协会将为你提供翱翔的蓝天，摄影协会将是你最佳的选择，摄影协会期待着你的加入。不要再犹豫了，心动不如行动，赶快加入摄协这个温馨的大家庭！', 'default.jpg', '2017-03-21');
INSERT INTO `association_info` VALUES ('6', '时光屋', '摄影', 'cesyzhao', ' 摄影协会是在校团委领导下的学生社团之一，成立于1986年，在成长的过程中，始终坚持“团结，进取，求实，创新”的宗旨，历年均与高分被评为“一级协会”，“十佳社团”。摄影协会现拥有独立的暗房和先进的专业设备收藏了大量的摄影文献资料，此外，摄协还拥有自己的会刊《大学生摄影》，至今已成功发行了十五期，现已并入《肇庆学院青年》报。留住瞬间相遇的幸福，追求多姿多彩的人生！摄影协会将为你提供翱翔的蓝天，摄影协会将是你最佳的选择，摄影协会期待着你的加入。不要再犹豫了，心动不如行动，赶快加入摄协这个温馨的大家庭！', 'default.jpg', '2017-03-21');
INSERT INTO `association_info` VALUES ('7', '时光啊时光', '摄影', 'cesyzhao', ' 摄影协会是在校团委领导下的学生社团之一，成立于1986年，在成长的过程中，始终坚持“团结，进取，求实，创新”的宗旨，历年均与高分被评为“一级协会”，“十佳社团”。摄影协会现拥有独立的暗房和先进的专业设备收藏了大量的摄影文献资料，此外，摄协还拥有自己的会刊《大学生摄影》，至今已成功发行了十五期，现已并入《肇庆学院青年》报。留住瞬间相遇的幸福，追求多姿多彩的人生！摄影协会将为你提供翱翔的蓝天，摄影协会将是你最佳的选择，摄影协会期待着你的加入。不要再犹豫了，心动不如行动，赶快加入摄协这个温馨的大家庭！', 'default.jpg', '2017-03-21');

-- ----------------------------
-- Table structure for association_notification
-- ----------------------------
DROP TABLE IF EXISTS `association_notification`;
CREATE TABLE `association_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of association_notification
-- ----------------------------
INSERT INTO `association_notification` VALUES ('1', '1', '测试公告', '这是一个测试公告，看到请忽略', '2017-03-21', 'cesy');
INSERT INTO `association_notification` VALUES ('2', '1', 'test notification', 'if you recive this notification, please ignore', '2017-03-21', 'cesy');

-- ----------------------------
-- Table structure for association_user_info
-- ----------------------------
DROP TABLE IF EXISTS `association_user_info`;
CREATE TABLE `association_user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_id` int(11) DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `a_id` (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of association_user_info
-- ----------------------------
INSERT INTO `association_user_info` VALUES ('1', '1', '1', 'admin');
INSERT INTO `association_user_info` VALUES ('2', '2', '1', 'normal');
INSERT INTO `association_user_info` VALUES ('3', '1', '2', 'normal');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `kind` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '测试新闻', '这是一个测试用的新闻', '2017-03-14', 'hot');
INSERT INTO `news` VALUES ('2', '测试新闻2', '这是一个测试用的新闻', '2017-03-15', 'normal');
INSERT INTO `news` VALUES ('3', '测试新闻2', '这是一个测试用的新闻', '2017-03-15', 'hot');
INSERT INTO `news` VALUES ('4', '测试新闻2', '这是一个测试用的新闻', '2017-03-15', 'hot');

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
INSERT INTO `users` VALUES ('1', 'cesy', '123456', 'mom\'s name', 'simmon', 'cesy', '21', '男', '1995-08-23', '6a31ceb81bdd2add8e1512865bebd156', '音乐,美食,游戏', 'lazy boy', 'A');
INSERT INTO `users` VALUES ('3', 'yuanLi', '1223456', 'test', 'yes', 'yuan', '21', '女', '1995-10-17', null, '音乐,美食', null, 'B');
INSERT INTO `users` VALUES ('4', 'test', '000000', 'test', 'test', null, null, null, null, null, null, null, 'C');
INSERT INTO `users` VALUES ('5', 'zhaosisi', '123456', 'test', 'test', null, null, null, null, null, null, null, null);
