-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 19 avr. 2025 à 14:04
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jeu-set-et-famille`
--

-- --------------------------------------------------------

--
-- Structure de la table `jeu`
--

CREATE TABLE `jeu` (
  `id_joueur` varchar(30) NOT NULL,
  `id_partie` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `parties`
--

CREATE TABLE `parties` (
  `id_partie` int(5) NOT NULL,
  `nom_partie` varchar(50) NOT NULL,
  `mot_de_passe` varchar(6) DEFAULT NULL,
  `nbr_joueurs` int(1) NOT NULL,
  `max_joueurs` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `parties`
--

INSERT INTO `parties` (`id_partie`, `nom_partie`, `mot_de_passe`, `nbr_joueurs`, `max_joueurs`) VALUES
(18, 'bla', NULL, 0, 2),
(19, 'test', NULL, 4, 4),
(20, 'test', NULL, 4, 2),
(21, 'bla', '425245', 0, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_client` int(5) NOT NULL,
  `nom_utilisateur` varchar(30) NOT NULL,
  `adresse_mail_utilisateur` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_client`, `nom_utilisateur`, `adresse_mail_utilisateur`, `mot_de_passe`) VALUES
(5, 'test', 'test@test.com', '$2y$10$EjWHibXALmO/0aOwsnZEIeUrdZjHcanoikIFZ4PtN9Bf5jjZeh0h.'),
(7, 'alexia', 'alexia@test.com', '$2y$10$yOjJYcQaN6hE2i28fG08Zet3RljoADWfq0U7wb1e9rPw3c.dQMqI6'),
(8, 'compte', 't@t.com', '$2y$10$4GeKcVE5ICmqCNTqw//L8Og6nfU3pCbo82Zy0jl5.UCFkQnZFVLDu'),
(9, 'sophie', 't@t.com', '$2y$10$bWC2rqGwcFgC5Fq5hdpxTOT4EUOaPHSvGL0VazuXfFixdk2fCzJDa'),
(10, 'AlexiaGst', 'alexia12122005@gmail.com', '$2y$10$WwMFVBCx6bFYEXobYGWbNu3MWZEQ8UauTUZ7zB9xA1IBBc1OuxBru');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `jeu`
--
ALTER TABLE `jeu`
  ADD PRIMARY KEY (`id_joueur`,`id_partie`),
  ADD KEY `id_partie` (`id_partie`);

--
-- Index pour la table `parties`
--
ALTER TABLE `parties`
  ADD PRIMARY KEY (`id_partie`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_client`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `parties`
--
ALTER TABLE `parties`
  MODIFY `id_partie` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_client` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `jeu`
--
ALTER TABLE `jeu`
  ADD CONSTRAINT `jeu_ibfk_2` FOREIGN KEY (`id_partie`) REFERENCES `parties` (`id_partie`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
