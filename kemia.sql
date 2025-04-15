-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 11:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atestat`
--

-- --------------------------------------------------------

--
-- Table structure for table `kemia`
--

CREATE TABLE `kemia` (
  `C` varchar(3) NOT NULL,
  `H` varchar(3) NOT NULL,
  `CH` varchar(6) NOT NULL,
  `nev` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kemia`
--

INSERT INTO `kemia` (`C`, `H`, `CH`, `nev`) VALUES
('C1', 'H4', 'C1H4', 'metán'),
('C2', 'H6', 'C2H6', 'etán'),
('C3', 'H8', 'C3H8', 'propán'),
('C4', 'H10', 'C4H10', 'bután'),
('C5', 'H12', 'C5H12', 'pentán'),
('C6', 'H14', 'C6H14', 'hexán'),
('C7', 'H16', 'C7H16', 'heptán'),
('C8', 'H18', 'C8H18', 'oktán'),
('C9', 'H20', 'C9H20', 'nonán'),
('C10', 'H22', 'C10H22', 'dekán'),
('C11', 'H24', 'C11H24', 'undekán'),
('C12', 'H26', 'C12H26', 'dodekán'),
('C13', 'H28', 'C13H28', 'tridekán'),
('C14', 'H30', 'C14H30', 'tetradekán'),
('C15', 'H32', 'C15H32', 'pentadekán');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
