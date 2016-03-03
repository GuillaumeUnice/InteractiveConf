-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: pfe
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `pfe` DEFAULT CHARSET=utf8;
USE `pfe`;


--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `public_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  KEY `public_id` (`public_id`),
  CONSTRAINT `fk_favorites_public_id` FOREIGN KEY (`public_id`) REFERENCES `public` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_favorites_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=470 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,1,3),(2,2,24),(3,3,51),(4,4,54),(5,5,32),(6,6,42),(7,6,23),(8,6,23),(9,6,36),(10,6,24),(11,6,77),(12,6,12),(13,6,21),(14,6,63),(15,6,14),(16,6,16),(17,6,12),(18,6,49),(19,6,50),(20,6,21),(21,6,21),(22,6,40),(23,6,9),(24,6,7),(25,6,4),(26,6,75),(27,6,75),(28,6,75),(29,6,76),(30,6,72),(31,6,18),(32,6,32),(33,6,73),(34,7,77),(35,6,23),(36,6,23),(37,6,23),(38,6,23),(39,6,23),(40,6,23),(41,6,23),(42,6,23),(43,6,23),(44,6,23),(45,6,78),(46,6,78),(47,6,78),(48,6,78),(49,6,78),(50,6,78),(51,6,78),(52,6,78),(53,6,78),(54,6,78),(55,6,78),(56,6,78),(57,6,78),(58,7,21),(59,7,63),(60,7,76),(61,7,44),(62,7,16),(63,7,78),(64,7,49),(65,7,4),(66,7,23),(67,7,12),(68,6,12),(69,6,12),(70,6,12),(71,6,12),(72,6,12),(73,6,12),(74,7,12),(75,7,12),(76,7,23),(77,7,23),(78,7,7),(79,7,23),(80,7,18),(81,7,38),(82,7,73),(83,7,40),(84,7,73),(85,7,73),(86,7,72),(87,7,50),(88,8,45),(89,9,24),(90,10,22),(91,6,82),(92,11,73),(93,8,12),(94,8,63),(95,6,54),(96,7,54),(97,8,54),(98,10,23),(99,10,23),(100,10,4),(101,8,4),(102,10,36),(103,10,63),(104,10,63),(105,10,63),(106,10,23),(107,12,45),(108,10,7),(109,8,7),(110,8,79),(111,13,54),(112,14,20),(113,8,17),(114,8,17),(115,8,17),(116,7,67),(117,10,66),(118,8,17),(119,8,17),(120,8,17),(121,8,17),(122,10,17),(123,8,17),(124,8,17),(125,8,17),(126,8,17),(127,14,63),(128,8,17),(129,14,36),(130,8,17),(131,14,36),(132,14,44),(133,8,17),(134,8,17),(135,8,17),(136,8,17),(137,8,17),(138,8,17),(139,14,24),(140,8,17),(141,8,17),(142,8,17),(143,8,17),(144,7,15),(145,8,17),(146,8,17),(147,8,17),(148,8,17),(149,8,17),(150,8,17),(151,8,17),(152,8,17),(153,7,15),(154,8,17),(155,8,17),(156,8,17),(157,8,17),(158,8,17),(159,8,17),(160,8,17),(161,7,15),(162,15,83),(163,14,4),(164,16,67),(165,14,11),(166,17,81),(167,8,17),(168,15,4),(169,15,63),(170,15,12),(171,15,12),(172,15,12),(173,15,12),(174,15,12),(175,15,12),(176,15,12),(177,15,12),(178,15,12),(179,15,12),(180,15,12),(181,14,86),(182,10,12),(183,10,12),(184,10,12),(185,10,12),(186,10,12),(187,17,11),(188,17,12),(189,17,12),(190,17,12),(191,17,12),(192,17,12),(193,17,12),(194,17,63),(195,17,12),(196,17,12),(197,17,12),(198,17,12),(199,17,12),(200,17,12),(201,17,12),(202,16,4),(203,17,12),(204,17,12),(205,17,12),(206,17,12),(207,17,4),(208,17,12),(209,17,12),(210,16,42),(211,16,63),(212,16,11),(213,10,12),(214,10,12),(215,10,12),(216,10,12),(217,16,82),(218,10,12),(219,10,12),(220,10,12),(221,10,12),(222,10,12),(223,10,12),(224,6,43),(225,17,12),(226,17,12),(227,17,12),(228,17,12),(229,14,54),(230,17,12),(231,17,12),(232,17,12),(233,18,45),(234,17,23),(235,17,23),(236,15,23),(237,17,67),(238,18,82),(239,18,63),(240,18,50),(241,18,37),(242,18,54),(243,18,43),(244,16,54),(245,18,88),(246,18,53),(247,19,89),(248,16,23),(249,17,10),(250,18,11),(251,18,16),(252,20,90),(253,19,54),(254,19,63),(255,17,90),(256,19,50),(257,19,49),(258,19,82),(259,19,42),(260,19,23),(261,19,32),(262,19,21),(263,19,16),(264,19,22),(265,19,81),(266,19,78),(267,21,86),(268,17,24),(269,17,24),(270,19,26),(271,19,45),(272,19,12),(273,22,91),(274,20,63),(275,20,94),(276,20,82),(277,20,42),(278,20,88),(279,20,22),(280,20,37),(281,19,93),(282,19,12),(283,19,37),(284,16,71),(285,20,19),(286,19,78),(287,19,53),(288,20,23),(289,15,103),(290,20,4),(291,23,97),(292,19,14),(293,19,14),(294,19,66),(295,24,102),(296,25,102),(297,26,86),(298,19,4),(299,20,14),(300,19,40),(301,19,75),(302,27,103),(303,28,45),(304,15,95),(305,19,103),(306,29,104),(307,15,97),(308,16,97),(309,30,82),(310,20,103),(311,17,97),(312,8,97),(313,6,97),(314,20,97),(315,18,97),(316,19,33),(317,19,21),(318,19,21),(319,19,21),(320,19,21),(321,19,74),(322,14,31),(323,19,21),(324,18,31),(325,20,16),(326,19,31),(327,31,32),(328,19,13),(329,32,81),(330,16,33),(331,33,45),(332,34,102),(333,20,10),(334,20,10),(335,16,17),(336,35,105),(337,32,4),(338,20,107),(339,15,107),(340,36,107),(341,37,109),(342,35,10),(343,35,4),(344,19,33),(345,35,48),(346,19,33),(347,19,33),(348,19,33),(349,19,33),(350,19,33),(351,19,33),(352,19,33),(353,19,33),(354,19,33),(355,19,33),(356,19,33),(357,19,33),(358,19,33),(359,19,33),(360,19,33),(361,19,33),(362,19,33),(363,19,33),(364,19,33),(365,19,33),(366,19,33),(367,19,33),(368,20,111),(369,19,33),(370,38,97),(371,39,112),(372,40,113),(373,41,48),(374,42,113),(375,43,50),(376,39,45),(377,19,114),(378,39,4),(379,32,114),(380,39,48),(381,44,115),(382,44,82),(383,45,116),(384,44,4),(385,32,24),(386,44,24),(387,19,108),(388,46,119),(389,47,32),(390,48,118),(391,45,82),(392,49,117),(393,50,120),(394,51,118),(395,44,93),(396,52,54),(397,53,122),(398,10,18),(399,54,124),(400,53,118),(401,55,108),(402,6,126),(403,53,126),(404,45,126),(405,39,126),(406,35,126),(407,54,37),(408,54,54),(409,54,122),(410,54,112),(411,54,4),(412,54,118),(413,54,32),(414,54,50),(415,56,124),(416,53,53),(417,53,54),(418,57,130),(419,58,130),(420,59,128),(421,60,82),(422,61,118),(423,55,4),(424,55,12),(425,62,131),(426,55,126),(427,63,122),(428,55,93),(429,59,118),(430,55,12),(431,55,12),(432,55,12),(433,55,12),(434,55,12),(435,59,122),(436,59,4),(437,55,12),(438,55,12),(439,55,12),(440,55,12),(441,19,123),(442,64,133),(443,55,12),(444,59,131),(445,65,118),(446,66,134),(447,59,131),(448,67,132),(449,64,4),(450,68,135),(451,64,132),(452,64,115),(453,59,114),(454,66,4),(455,66,114),(456,66,115),(457,69,136),(458,68,4),(459,66,136),(460,70,137),(461,71,138),(462,68,139),(463,72,112),(464,73,141),(465,74,144),(466,72,147),(467,68,147),(468,45,147),(469,69,147);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `public`
--

DROP TABLE IF EXISTS `public`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `public` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hash_cookie` text NOT NULL,
  `ip` varchar(255) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `socket_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `public`
--

LOCK TABLES `public` WRITE;
/*!40000 ALTER TABLE `public` DISABLE KEYS */;
INSERT INTO `public` VALUES (1,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO38dOqHgMiaPyOAbZpITPRpLzP8qkrvO','','Romain','Palm',''),(2,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOIms0a08TP1SfTAw2zRMvSKq2meTmw7q','','David','Mellul',''),(3,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOme/vP9476KtlQHg.0Bvw.aeMDnahahG','','David','Mellul',''),(4,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOyukzag25T6NcVQ0l9nL0nSbnjgJqYnO','','Quentin','Parra',''),(5,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOatseJYNY0G18WnRub7u0fx9l05j20S2','','Louis','Matonti',''),(6,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOUjBuYl4kH7wPol9fA17InVqbaPMykai','','Jérémy','Lagravere',''),(7,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOnDRp9ggngMOixXQDGQMWRO33wqPnTHa','','Yassine','Jrad',''),(8,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOmEwiE3/tRYlXB.KKpe5Lh/AknKhxQZ6','','Aubin','Abadie',''),(9,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOClctNTozKS3hGYGRTnvGgYV2KfRg7JC','','Michael','Namand',''),(10,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOn45MBT3f5A9LwPvuh1jZHxgLVZmmGZ6','','Sacha','Wenzel',''),(11,'$2a$10$7UhHKbpyqc/mwWEyfXQrmODEWSIRlHG2gPWKxFDDw/tfCKXiJAdcG','','Alexandre','2',''),(12,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO.8lLb7tixLDTuSaKZ40R/Y9/zyCfJOy','','Alex','Ferretti',''),(13,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO4ipnvk8PXS.mSqlg/PuxjM1Gux1ReR2','','Alexandre','1',''),(14,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOoyHthqAujk.VTDRpUXXsq6RDqm6IkLW','','Christian','Friedrich',''),(15,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOew2SH6WcDY4N58HxZuRv9GjXTVrg.YW','','Arno','Olivieri',''),(16,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOSF5sSdyW9n.utFnDvwg089ftjSko1/.','','Mickaël','Adrar',''),(17,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOTuuPDZheYoiS1L4pp6.Htfp/49bXiTe','','Gabriel','Curinga',''),(18,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOnzBfEdMqQCr55abGs45.jyhr/2F/ctO','','Loïs','Long',''),(19,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO7yEnCiSivHKNGxpLHHzj21SlmsTWABO','','Yacine','Tebboune',''),(20,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOYdMmtZVIeGu4nfZGg8kB7UKgU1.GhPC','','Jeremi','Ferre',''),(21,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO4hwY5imncXD0RQ0k8l8Q3m7TN6m2D.W','','Mathieu','Tua',''),(22,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOI/A.VmgBGacGkWLrSje/3P6QrrgQUYS','','Sebastien','Saez',''),(23,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOJnoepHNe/a3ziEm4YCoNb9GTPmZJadu','','Arnaud','Fernandez',''),(24,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOTLhvNeIXIgOkk7vANESMOA6bDCBrCb6','','Rémy','Dargent',''),(25,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOxnD0UU/9sR8AONvlqQz5CP30BfhOxY6','','Laura','Lopez',''),(26,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOZx8nIGI51Zu2JTIPgWl6eT9Hb8ZoBxi','','Théos','Mariani',''),(27,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOyL31BJmZkc68.w6KYeFGH5VHIl62gvK','','Hugo','Abrikh',''),(28,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO9f576ZH5Qjga.Yg/eN4n04x1SdzJZ4m','','Thomas','Rebouillat',''),(29,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOs5IpKcH/LbyAkn.c/QkaT/x0IbhRaPm','','Bastien','Durandetto',''),(30,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOZxKHt0hEcjvtP.C4DHavwyeijAmBrwC','','Adrian','Faure',''),(31,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOMvLQI4RORtNJ4lYUjUFLS2oJpEvNEgi','','Solen','Pensel',''),(32,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO293uLHZ1sh/EzacJfwwaGyAP5UU//nK','','Anthony','Piquard',''),(33,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOIv4A03jK41T1N07A791un5mvG97bZPa','','Simon','Wolkiewiez',''),(34,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOQNT0skgqzptbXuaS8RXhseJORlN2EC2','','Valentin','Visintin',''),(35,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOhaEgT2y72eNZQ1XiEkwafyByXCGcDMG','','Eliot','Roussel',''),(36,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOBc1e0qxkpJwFabLf4gj40CDRLbnYC7K','','Maxime','Teillaud',''),(37,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOVnJVMXNSKTG2pOpMIeVzVCHC890UzSW','','Eliot','Roussel',''),(38,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOPSxriJWAn4SfR8dm8lDzGdsvIlhuYwG','','Karl','Busson',''),(39,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOvB.CCSeNF/RDI.KdpsyIi3fPglYyC1O','','Johan','Thomias',''),(40,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOiCl.vBnV.AfpvY.KKuPcrQ0Zm5d111e','','Rémy','Munier',''),(41,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOM.WbCtUIPserqiC5P0WjBcsknOWkDRq','','Valentin','Visintin',''),(42,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOTKJ4XH.eFTDrRWMsihLbxajqFY/F5IK','','Pootis','Spencer',''),(43,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOe7JJ4i1aGx8I0tj7RY2qzXM5IvwD45K','','Arnaud','Ceragioli',''),(44,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOJ//JEC8I0.yWClQoA3PtRu7Zk421Vii','','Anthony','Cuttivet',''),(45,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOh3RrKBh0uHfbhmYzIC8LUJ3dLSdv4oi','','Thibault','Semiondd',''),(46,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOsXZuuOO0eS3clqC3y8gW1XpEOkb6PMK','','Hugo','Simonet',''),(47,'$2a$10$7UhHKbpyqc/mwWEyfXQrmODhueXsgRqsKNSaqy4sortHkufYnDhQ2','','Younes','Abdennadher',''),(48,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOGS9ITXKDCS7MTzhCIonQO4p0FB.TpQO','','Thibaud','Sémiond',''),(49,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOysEPWkEktAtZZHoYRZglHSoYXduOaJi','','Thibaut','Sémiond',''),(50,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOGLoxBq24YA2mnbo9XAZRiXHTy/kzNwK','','Hugo','Bimes',''),(51,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOjcgTuvKjJPKShJk8leHQzo2mn0Wjyzi','','Echyzen','Eyoama',''),(52,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOGoaT33NbK.KAjSNMA9cJSMrfqggHNNO','','Test','Test',''),(53,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOztLotWM81O5rJw0wtmHV/ghPtVCZhTy','','Kevin','Aubriet',''),(54,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOeNitifuymJW6OWc8yJ48AtHz4wHRKhW','','Gabe newell','Hl3 confirmed',''),(55,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOPOTlCGN98rZE/YMtRimHp7svdQWmFta','','Thibaut','Schall',''),(56,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOXJL4Xj2lAYwFNQQkKNaSw8YUgPOdX.6','','Thibaut','Schall',''),(57,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOfeXDvrRnZ2vJpcQkTaVL61XlKNiKrM6','','Thibaut','Schall',''),(58,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO3DabRbUIOLPc5ORjBavLpXZVh9GAA7e','','Thibaut','Schall',''),(59,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOsIFsAIiCNWfCMPTlarX0joxhwa83ry.','','Thibaut','Schall',''),(60,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOaCnEorMUwjYS5j8peUWWDMDgSPpst8y','','Thibaut','Schall',''),(61,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOYFb3KRg3mzziIa8INLZ6SbxOc9eiVlW','','Thibaut','Schall',''),(62,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOTZcDkyGPV8vwd9eS/BMy7YP6E64nOGe','','Thibaut','Schall',''),(63,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOsE0AFt18LF1otIT69qgB9mo2BHCYtNO','','Thibaut','Schall',''),(64,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOB3TLVLqs/v4fBZHUrqIFyuqzjKmZgb6','','Johann','Bernard',''),(65,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO0rfXEswj4OSw0GSel6/8BBw1Gw7N2om','','Johann','Bernard',''),(66,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO8Xq5/12Owms0X.ZunMyX66RFVdnSzFm','','Johann','Bernard',''),(67,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOnV/hkPjh2Af53/P07edW4W9gCH98AHi','','Francois','Montigny',''),(68,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOI/k40IindaaKj2nI1npwsYa7xfFzw8.','','Guillaume','Monrolin',''),(69,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOLnAx174Wuu9bibuKQ5d8H0a30inJuGS','','Valentin','Rondeau',''),(70,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOyHTob2Nu7zJFdBOOsaVZFqn9Y3eKuOK','','Kilian','Clark',''),(71,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOZMCuDZslsMUCEZXrrSAwvOny/Zj.xAu','','Luc','Chauris',''),(72,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOlCltLVqARyjKjpi4/loOFM2jHDFkvGe','','Sam','Exite',''),(73,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOB96pq3ce1oMKNr8A88Q2z69JpW/gj/i','','Al','Kollyck',''),(74,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO6GUeQAkU1syADVorQe8AyRYRco8Ffpi','','Mohamed','Khchiou',''),(75,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOIp9vgt18sjlvD.2VZPd6gYegNyQBdZa','','Clément','Guillaume',''),(76,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO57NXTBhJAMnbrjVjA.AGH31a7xbAOA.','','Enzo','Furnion',''),(77,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOPhdhZM5x57Svb2VrE.g89fnRnD2BB.S','','David','Mellul',''),(78,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO/bXLcOItzYVMltxjWvwd0UzhPTg9rNe','','Dylan','Gallin',''),(79,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOZNfIWdt9jHZie2eIhaYR0ZL4sz4SKri','','Test','Test',''),(80,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOghYXdz.1eW4j2jxT4jaKDDQNhhBFdvq','','Hugo','Francois',''),(81,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOj5a/FI1XU5Iv1yrJJ4PNn5Wh5QXrKb6','','Hugo','Simonet',''),(82,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOUHP3Xyuqx9nr6ZeXsGBuQTjidCf3W1i','','L4d3+','Hl3',''),(83,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOKoLzl9ixOnrKlWLDG0H3/f03DRNfUom','','Theo','Joubert',''),(84,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOGn/vr6fqJ1oyD91Hm7NhbdSu7htfsU6','','Enzo','Furnion',''),(85,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOFCaryFpSd55dwAEg2SsE6dZD4khIV7e','','Gaetan','Rey',''),(86,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOAyUNAVbXrCKHbgwF006p66t6Fi9GKPm','','Gabriel','Lecorse',''),(87,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOYV9zSh2XxVEAdmlzPJM43AS4Vm/TK/e','','Gabriel','Lecorse',''),(88,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOI7Va3jd11AGuN1uqsIwbSAfXjJGjaWW','','Rom','P',''),(89,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOr7/a3D6ZWi9qvDKjtwPKUVzaDM6WAnm','','Gaetan','Rey',''),(90,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOAyJ0/YBcv2U4QxEC0mKeiz1/F/QUpOK','','Jeanne','Marcade',''),(91,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO7BAS3c2nocBLY.DQnlZy7Df6dwOYaii','','Jeanne','Marcadé',''),(92,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO14/O5GAw2IHGlOYJAyF2HGRDlvvpWyq','','Anonyme','',''),(93,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOuzKhaESd5Bh2eAEsYNRDD/yYIqz.mL.','','Anonyme','',''),(94,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOOVvCCEnDmSKhLzQdueRoqte4FDwr4DC','','Thomias','Johan',''),(95,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO8FVWhsapzRA/0kSkaqV44bqCSRwlTQi','','Rexarr','',''),(96,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOqt2iTHqH8PB06eZPSga3yqVEe6SEFAq','','Reda','El caidi',''),(97,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOblTErpJnQcDaceo6VZFUCRP1WEYq9m.','','Eddy','Malou',''),(98,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO5Xmk3NnSpz.zsOR0SMqn7e4TXdUVdXK','','Jeanne','Marcade',''),(99,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO42c/LrbS/fhrFGEQpuFZVAQsp9hm63i','','Jeanne','Marcade',''),(100,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOkrPtQVh.aLCnsH8BycQ75fALi4EF95y','','Jeanne','Marcade',''),(101,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOqgoIsYhOfNPqzfSCW44O74QGJXsNb.u','','Jeanne','Marcade',''),(102,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOSzNlDVM4dWMy1yHmRmbCWbrjQBJJp/y','','Jeanne','Marcade',''),(103,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOXTWjqor1hkYbkvsaxH2lLBM8EGfnaWC','','Yohan','Eng',''),(104,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOPeZJztU2IU7wiGE.AUVlnVMqLAUz8V.','','Sylvain','Durif',''),(105,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOsEwtfiNdtQVpNPr6YRDntpK4UZ.PEZy','','Adrienne','Audouarde',''),(106,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOTS1e7SxRgN46TI17poVejrvKn1yFJOm','','Solen','Pensel',''),(107,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO/rRowNj7ofz.Vs3JhxJkOdCGLJb7QdO','','Enzo','Furnion',''),(108,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOy2QITExsbFN2PRjMo.S6kaHzj40Aedq','','M.','Khalifa',''),(109,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO5xTAZLS0vv7FkfNSkUYqpOJ19IRNupe','','Jeanne','Marcade',''),(110,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOlVoF/zCHCqqwxSjz8sqqY6XW7bWbnn6','','Arnaud','Ceragioli',''),(111,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOogj8TTz1cbEErbrsbCCRdwjuYIwq/cO','','Dylan','Gallin',''),(112,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOosyFGO1PjP4kks0wv77rch3.CtDjI7m','','Oscar','Baronlefilsdepute',''),(113,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOEPW5pKlAX80JEg4/p58x1/ufm3OsiTi','','Jeanne','Marcade',''),(114,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOL8Oo.24W1SdMSDs4bWkYQLSgaWdBSma','','Ah','Oui oui',''),(115,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOaoZjDZzVytiZ3ZXcqIZ6QjmW8N5GTha','','Benjamin','El koubi',''),(116,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOelEEBOtB1Oi2yXNlvjim0Aqcb.RCIJW','','Adrien','Audouardlencule',''),(117,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOGKrAdcq28crjvs.FSAHEd1.VNmrBoXm','','Mireille','Blay',''),(118,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOKbHWuHeRy/FIieBFzKTy6T0QycmSAfi','','Curinga','Corse',''),(119,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOq17rrha7/tnxqx91leo/Gczv/lo5TaG','','Leonardo','Dicaprio',''),(120,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO2q6F57loNqHXEI.eHqk/rzIlkUnaD1e','','Jeanne','Marcade',''),(121,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOTRtzJ9eBPnDYu9ZwgdK8EFQarjdL86m','','David','Mellul',''),(122,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOMNXvOHVCsjdFdHRmry7OnBIBJa9l1oO','','Omar','Boullet',''),(123,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOfOzgw4LLJ33Nq4aJ0px0klypz2.alSG','','Anthony','Cuttivet',''),(124,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOZ7ePgWst0vh5vDRak0sTgSsB1gEWi0m','','François joe','Montignylamenace',''),(125,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO1LmGXZGHhsoz4TbcO0ZMzykDVzjVSES','','Loic','Reveney',''),(126,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOo.BaujSgkJSUMgUviwDKoNFx.IX/.m6','','X','Y',''),(127,'$2a$10$7UhHKbpyqc/mwWEyfXQrmORnOIH2PMrrtNlgHiYbDhOQN.QBGImy2','','Simon','Wolkiewiez',''),(128,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO7kE7MB7.ZFRJE6kILPejXAsfqQPtaXy','','Loic','Reveneyplu',''),(129,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOQjRjuiYh8TDSr98pdaWZLjkrJlvAnSC','','Ch','Gifxix',''),(130,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOH5ooNG6DQHSa6.zjsKxBPBIY9kzYbYy','','Jeane','Marcade',''),(131,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOJROXJ2ZBUApfFMBnnnyzKwMHP/dTmZu','','François','Hollande',''),(132,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO8zdV5M2gStNAVtggUnkpV4yzZg.jr4y','','Gabe','Newell',''),(133,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO6rTNrED0nU91.f2eQ.OFj4vo9qjHrYu','','Lama','Shin',''),(134,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOLjZ8TbiJGo9BGbw.J2EWfDqrBip3DFG','','Daniel','Coupdebouleeid',''),(135,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOG/C8ACjncT5D.TvgM6Dk8R1KUjCfSGW','','Arnal','Ceragioli',''),(136,'$2a$10$7UhHKbpyqc/mwWEyfXQrmObZIZ3OY5skZ4bMZcXg62KmSgtZTwKsG','','Marine','Lepen',''),(137,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOwaEBylu3iGF5UNoYHfq9LxKBdF1DZ1e','','Younes','Aboudouner',''),(138,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOuOxv2RdTqyKwQMm0ZdK0KSop.37SSiq','','Sebastien','Lévadé',''),(139,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOZc4XieGSwjzuuEUPmryDanfXD866Bh2','','L4d3+','Hl3',''),(140,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOzk4AW9shLhACVhLNO6nlPpEXpzfJapK','','Dylan','Gallin',''),(141,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO4VrOTbfVdexHWNbyM5HNP.BR8pHbZv2','','Test','Fun',''),(142,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOfQCNwUU/QBIf4ODxzezy99GQ26DQxNO','','Test','Fun',''),(143,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOnxKYY/tuW35140r2loSJPaY4UaQgBPS','','<script>alert(\\\'a\\\')</script>','<script>alert(\\\'a\\\')</script>',''),(144,'$2a$10$7UhHKbpyqc/mwWEyfXQrmO0PcE.2qrgwnb8FS9uwrwZFfSwgWecte','','<script>alert(\'a\')</script>','<script>alert(\'a\')</script>',''),(145,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOUfziLahgq9/2E83MoXTGKHhuM/BcWBy','','Test','',''),(146,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOQ/NO8kV1i2y8Cy3EbcVz.cEN6kT7Gt6','','A','A',''),(147,'$2a$10$7UhHKbpyqc/mwWEyfXQrmOSgDHu5ufBiRPVTzUYLL1foXaTmXVW62','','User','Admin','');
/*!40000 ALTER TABLE `public` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `status_code` int(11) NOT NULL,
  `public_id` int(11) DEFAULT NULL,
  `num_slide` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `up_vote` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `public_id` (`public_id`),
  CONSTRAINT `fk_question_public_id` FOREIGN KEY (`public_id`) REFERENCES `public` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Ça fonctionne ?',0,3,NULL,NULL,1,'2016-02-29 08:09:37'),(2,'Test one two on two',0,24,NULL,NULL,1,'2016-02-29 08:11:23'),(3,'Ceci est une question de test',0,51,NULL,NULL,1,'2016-02-29 08:12:45'),(4,'C\'est pour quand hl3 ? ',0,54,3,NULL,1,'2016-02-29 08:14:58'),(5,'Salut , comment ça va ?',0,32,NULL,NULL,1,'2016-02-29 08:15:03'),(6,'Le DS ne comportera que des diagrammes de classe ou les diagrammes de séquence seront aussi inclus ?',25,42,NULL,NULL,11,'2016-02-28 22:17:37'),(7,'Est-ce que le TD sur le robot sera prolongé dans les TDs suivants ?',25,77,NULL,NULL,18,'2016-02-28 15:19:54'),(8,'Dans quelle cas utiliser les diagrammes de séquence ? ',30,45,NULL,NULL,9,'2016-02-29 00:23:46'),(9,'Retour: bug sur les heures des questions qui sont incohérentes (posté il y a 8h)\nLe nb d\'étoiles sur les questions semble changer aléatoirement ',0,24,NULL,NULL,1,'2016-02-29 08:23:55'),(10,'Peut-on faire un cast dans un diagramme  ? ',30,22,NULL,NULL,7,'2016-02-29 02:24:01'),(11,'Quelle est le rapport avec les gaufres?',0,73,NULL,NULL,1,'2016-02-29 08:24:15'),(12,'Kan kes kon mange lé gofre ? \n',0,45,NULL,NULL,1,'2016-02-29 08:25:24'),(13,'Vous connaissez laink et terracid ? ',0,54,NULL,NULL,1,'2016-02-29 08:25:56'),(14,'Les diagrammes de séquence doivent être réalisés avant ou après les diagrammes de classe ?',30,20,NULL,NULL,11,'2016-02-28 22:25:57'),(15,'Comment marche le polymorphisme ?',5,83,NULL,NULL,9,'2016-02-29 00:27:12'),(16,'Peut-on espérer un DS fait sur machine et non à l\'écrit ?',10,67,NULL,NULL,10,'2016-02-28 23:27:18'),(17,'La cardinalité sur les diagrammes de séquences est-elle obligatoire ?',30,81,NULL,NULL,9,'2016-02-29 00:27:21'),(18,'Je comprends rien c\'est quoi le polymorphisme ?\n',10,45,NULL,NULL,13,'2016-02-28 20:28:16'),(19,'Je comprends rien non plus, il est où le DT ?',10,89,NULL,NULL,24,'2016-02-28 09:29:31'),(20,'Peut on mélanger diagramme de séquence et diagramme de cas d\'utilisation ? Si oui quelle utilité ?',25,90,NULL,NULL,18,'2016-02-28 15:30:12'),(21,'Pourquoi Gaétan Rey peut poser des questions?',0,86,NULL,NULL,1,'2016-02-29 08:31:27'),(22,'Eh !!les gars quelqu\'un veut sortir avec moi??',0,91,NULL,NULL,1,'2016-02-29 08:31:43'),(23,'Peut on dire que le polymorphisme amène vers une dynamique des sports ? ',0,97,NULL,NULL,1,'2016-02-29 08:33:07'),(24,'Eh!! Les gars quelqu\'un veut sortir avec moi ?',0,102,NULL,NULL,1,'2016-02-29 08:33:31'),(25,'Eh!! Les gars quelqu\'un veut sortir avec moi ?',0,102,NULL,NULL,1,'2016-02-29 08:33:32'),(26,'Je dis Oui!!!!!!',0,86,NULL,NULL,1,'2016-02-29 08:33:33'),(27,'Un objet peut îl changer de classe ?',0,103,NULL,NULL,1,'2016-02-29 08:33:40'),(28,'Esque le robot qui distribue les fleur possède d\'autre cas d\'utilisation ? \n#pizzwich',0,45,NULL,NULL,1,'2016-02-29 08:34:11'),(29,'Les constants signifient quoi ?',0,104,NULL,NULL,1,'2016-02-29 08:34:25'),(30,'Vous êtes en colère ?',0,82,NULL,NULL,1,'2016-02-29 08:34:36'),(31,'Pourquoi il y a un avion dans la diapo d\'analyse et de conception des classes ?',0,32,NULL,NULL,1,'2016-02-29 08:35:39'),(32,'Les multiplicités sur les diagrammes de classe sont elles obligatoires ?',30,81,NULL,NULL,4,'2016-02-29 05:35:43'),(33,'Un pizzwich peut-il faire l\'objet dun diagramme de séquence ? ',0,45,NULL,NULL,1,'2016-02-29 08:36:20'),(34,'Eh les gars, quelqu\'un veut sortir avec moi ? ',0,102,NULL,NULL,1,'2016-02-29 08:36:35'),(35,'Je ne comprends pas ce que signifie Stakeholder layer?',5,105,NULL,NULL,5,'2016-02-29 04:36:43'),(36,'Ça veut dire quoi Stackholder layer ?',0,107,NULL,NULL,1,'2016-02-29 08:37:46'),(37,'Eh les gars, quelqu\'un veut sortir avec moi ?',0,109,15,NULL,1,'2016-02-29 08:38:20'),(38,'Que signifie la congolexicomatisation ? ',0,97,NULL,NULL,1,'2016-02-29 08:40:29'),(39,'Peut-on inclure des attributs protégés dans les diagrammes de classe ?',30,112,NULL,NULL,5,'2016-02-29 04:40:37'),(40,'Eh les gars, quelqu\'un veux sortir avec moi ?',0,113,12,NULL,1,'2016-02-29 08:41:17'),(41,'Est ce qu\'un pizzwich peut faire l\'objet d\'un diagramme de séquences ?',0,48,NULL,NULL,1,'2016-02-29 08:41:18'),(42,'Eh les gars, quelqu\'un veut sortir avec moi ?',0,113,20,NULL,1,'2016-02-29 08:42:03'),(43,'Les questions de mon camarade ne s\'affiche pas. Est-ce normal, a-t-il été perma ban ?',0,50,NULL,NULL,1,'2016-02-29 08:42:19'),(44,'A quoi servent les diagrammes de classe ?',10,115,NULL,NULL,5,'2016-02-29 04:43:08'),(45,'Quel est le lien entre les diagrammes de séquence et les classes?',10,116,NULL,NULL,4,'2016-02-29 05:43:48'),(46,'#teamOscar baron',0,119,NULL,NULL,1,'2016-02-29 08:44:34'),(47,'À quoi sert les gestionnaires d\'inscription ? :kappa',0,32,NULL,NULL,1,'2016-02-29 08:44:37'),(48,'C\'est quoi une ligne de vie ? Je suis perdu',0,118,NULL,NULL,1,'2016-02-29 08:44:44'),(49,'C\'est de la merde ! Vous m\'expliquez ?',0,117,NULL,NULL,1,'2016-02-29 08:44:48'),(50,'Eh les gars, quelqu\'un veux sortir avec moi ?',0,120,20,NULL,1,'2016-02-29 08:47:13'),(51,'Fait on des diagrammes de séquences en corse ?',0,118,NULL,NULL,1,'2016-02-29 08:48:13'),(52,'À quoi sert la COO ? ',0,54,NULL,NULL,1,'2016-02-29 08:48:17'),(53,'Dans les diagramme de séquence la temporalité influe elle sur la conception de l\'ergonomie ?\n',5,122,NULL,NULL,5,'2016-02-29 04:48:30'),(54,'Bonjour est il possible d\'utiliser cette application à des fins pédagogiques ?',25,124,NULL,NULL,9,'2016-02-29 00:49:27'),(55,'Peut on commencer par le diagramme de sequence plutot que par celui de classe ?',20,108,NULL,NULL,3,'2016-02-29 06:50:01'),(56,'Utiliser cette application à mauvais escient nuit à ma scolarité.',0,124,NULL,NULL,1,'2016-02-29 08:51:44'),(57,'Eh les gars, quelqu\'un veut sortir avec moi ?',0,130,NULL,NULL,1,'2016-02-29 08:52:47'),(58,'Eh les gars, quelqu\'un veut sortir avec moi ?',0,130,NULL,NULL,1,'2016-02-29 08:52:48'),(59,'Y-a-t-il une syntaxe spéciale pour les attributs \'\'protected\'\' ?',25,128,NULL,NULL,6,'2016-02-29 03:53:06'),(60,'L\'application ne fonctionne plus tout a été remplacé par des carrés fermés ',0,82,NULL,NULL,1,'2016-02-29 08:53:07'),(61,'Peut on utiliser un diagramme de séquence dans le cadre d\'une actione pour le moins complexe ?',0,118,NULL,NULL,1,'2016-02-29 08:53:26'),(62,'Ce diagramme permet-il de faire baisser le chômage ?',0,131,NULL,NULL,1,'2016-02-29 08:53:36'),(63,'A quelle moment leco conception intervient-elle dans les diagramme ?',0,122,NULL,NULL,1,'2016-02-29 08:53:52'),(64,'Quelle est la difference entre les attribut protégé et ceux non-protégé ?',20,133,NULL,NULL,4,'2016-02-29 05:54:55'),(65,'Diagramme de séquences telle est la question ',0,118,NULL,NULL,1,'2016-02-29 08:55:19'),(66,'En quoi la structuration en packages est utile pour les diagrammes de séquence?',5,134,NULL,NULL,5,'2016-02-29 04:55:36'),(67,'Est ce que les diagrammes de séquences permettent l\'arrivée de nouvelles caisses ? ',0,132,NULL,NULL,1,'2016-02-29 08:56:35'),(68,'Quel est l\'utilité ,dans le domaine professionnel ,d\'un diagramme par séquence ?',5,135,NULL,NULL,4,'2016-02-29 05:56:43'),(69,'En ce qui concerne les diagramme de séquence doit on les detaillier au maximum ? ',25,136,NULL,NULL,2,'2016-02-29 07:57:44'),(70,'Faut il prendre un diagramme de séquences dans son contexte de travail',0,137,NULL,NULL,1,'2016-02-29 08:58:57'),(71,'Où peut on récupérer le cours?',0,138,NULL,NULL,1,'2016-02-29 08:58:59'),(72,'<script>alert(\\\'a\\\')</script>',10,112,NULL,NULL,2,'2016-02-29 08:06:49'),(73,'Cela va marcher ?',0,141,NULL,NULL,1,'2016-02-29 09:16:44'),(74,'Testtestetstest',0,144,NULL,NULL,1,'2016-02-29 09:25:18');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `responses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `fk_responses_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responses`
--

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
INSERT INTO `responses` VALUES (1,64,'De manière générale le protected permet de réutiliser l\'attribut pour les classe filles ce qui n\'est pas le cas des attributs private'),(2,55,'Diagramme de séquence puis diagramme de classe car les classes sont déduites');
/*!40000 ALTER TABLE `responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `socket_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pseudo` (`pseudo`,`socket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'chairman','$2a$10$qJIsuzJ.r.mgf5YIv8HZLunUQiC4LhGgSsZ/KxanyPO2MVpQgh1BW',10,'56643717688122d0e6d372c9');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-29 12:22:50
