-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Dim 06 Décembre 2015 à 17:35
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `pfe`
--

CREATE DATABASE IF NOT EXISTS `pfe` DEFAULT CHARSET=utf8;
USE `pfe`;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `status_code` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `response_id` int(11) DEFAULT NULL,
  `slide_start` int(11) NOT NULL,
  `slide_stop` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `response_id` (`response_id`),
  KEY `response_id_2` (`response_id`),
  KEY `user_id_2` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Contenu de la table `questions`
--

INSERT INTO `questions` (`id`, `content`, `status_code`, `user_id`, `response_id`, `slide_start`, `slide_stop`) VALUES
(1, 'Minim irure eiusmod nostrud fugiat cupidatat elit velit?', 20, 6, NULL, 22, 23),
(2, 'Qui nisi fugiat ea exercitation velit officia elit in sunt ex?', 15, 5, NULL, 2, 2),
(3, 'Et laborum enim amet excepteur sunt?', 25, 1, 1, 18, 20),
(4, 'Sunt esse amet nostrud commodo consectetur consequat fugiat do cupidatat?', 5, 5, 3, 20, 20),
(5, 'Culpa cupidatat ipsum aute cillum dolore amet ullamco esse culpa aute dolor non exercitation?', 5, 4, 3, 38, 38),
(6, 'Dolor deserunt commodo reprehenderit aute minim ex tempor eiusmod ullamco elit eu consequat sit?', 25, 6, 4, 4, 8),
(7, 'Commodo est exercitation cillum id ex do cupidatat cillum?', 15, 1, 5, 4, 4),
(8, 'Officia reprehenderit sunt laborum consectetur ad esse ea qui aliqua ipsum cupidatat?', 20, 1, NULL, 7, 7),
(9, 'Labore eu cupidatat fugiat irure laboris eu?', 15, 6, NULL, 35, 35),
(10, 'Et sint tempor mollit nisi et exercitation exercitation ad non occaecat consectetur?', 20, 3, NULL, 23, 26);

-- --------------------------------------------------------

--
-- Structure de la table `responses`
--

CREATE TABLE IF NOT EXISTS `responses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `responses`
--

INSERT INTO `responses` (`id`, `content`) VALUES
(1, 'Laboris eiusmod cupidatat reprehenderit proident.'),
(2, 'Ipsum ad qui aliqua mollit sint sunt minim velit et.'),
(3, 'Anim deserunt commodo consequat cillum eiusmod occaecat proident ut eu excepteur.'),
(4, 'Do cillum excepteur consectetur pariatur fugiat consequat laborum ullamco irure labore sint.'),
(5, 'Esse adipisicing minim velit aliquip dolor qui excepteur pariatur laborum amet aliqua non laborum.');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `socket_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `role`, `socket_id`) VALUES
(1, 'Pena', 0, '56643717688122d0e6d372c9'),
(2, 'Lang', 0, '56643717576152991b27522b'),
(3, 'Lawson', 0, '566437179228cafb13c460ba'),
(4, 'Strickland', 0, '56643717e931b7119eee7587'),
(5, 'Nielsen', 0, '566437171a95574bf36f5a94'),
(6, 'Baker', 0, '566437174dfce421343ac8b2'),
(7, 'Campbell', 5, '56643717a14a98713d8fedab'),
(8, 'Michael', 5, '56643717a0920b701b718600'),
(9, 'Dillon', 10, '566437170f1c27207770d91b'),
(10, 'Parsons', 15, '56643717a73f4fc1fde61c74');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`response_id`) REFERENCES `responses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
