-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 11:02 AM
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
-- Table structure for table `savak`
--

CREATE TABLE `savak` (
  `elem` varchar(5) NOT NULL,
  `gyok` varchar(5) NOT NULL,
  `sav` varchar(10) NOT NULL,
  `nev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `savak`
--

INSERT INTO `savak` (`elem`, `gyok`, `sav`, `nev`) VALUES
('Ca', 'Cl', 'CaCl', 'Kálcium-Klorid'),
('Ca', 'CO', 'CaCO', 'Kálcium-Karbonát'),
('Ca', 'NO', 'CaNO', 'Kálcium-Nitrát'),
('Ca', 'OH', 'CaOH', 'Kálcium-Hidroxid (bázis)'),
('Ca', 'SO', 'CaSO', 'Kálcium-Szulfát'),
('H', 'Cl', 'HCl', 'Hidrogén-Klorid'),
('H', 'CO', 'HCO', 'Hidrogén-Karbonát'),
('H', 'NO', 'HNO', 'Hidrogén-Nitrát'),
('H', 'OH', 'HOH', 'Hidrogén-Hidroxid (víz)'),
('H', 'SO', 'HSO', 'Hidrogén-Szulfát'),
('K', 'Cl', 'KCl', 'Kálium-Klorid'),
('K', 'CO', 'KCO', 'Kálium-Karbonát'),
('K', 'NO', 'KNO', 'Kálium-Nitrát'),
('K', 'OH', 'KOH', 'Kálium-Hidroxid (bázis)'),
('K', 'SO', 'KSO', 'Kálium-Szulfát'),
('Mg', 'Cl', 'MgCl', 'Magnézium-Klorid'),
('Mg', 'CO', 'MgCO', 'Magnézium-Karbonát'),
('Mg', 'NO', 'MgNO', 'Magnézium-Nitrát'),
('Mg', 'OH', 'MgOH', 'Magnézium-Hidroxid (bázis)'),
('Mg', 'SO', 'MgSO', 'Magnézium-Szulfát'),
('Na', 'Cl', 'NaCl', 'Nátrium-Klorid'),
('Na', 'CO', 'NaCO', 'Nátrium-Karbonát'),
('Na', 'NO', 'NaNO', 'Nátrium-Nitrát'),
('Na', 'OH', 'NaOH', 'Nátrium-Hidroxid (bázis)'),
('Na', 'SO', 'NaSO', 'Nátrium-Szulfát');


--
-- Indexes for dumped tables
--

--
-- Indexes for table `savak`
--
ALTER TABLE `savak`
  ADD PRIMARY KEY (`sav`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
