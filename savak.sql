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
('Ca', 'Cl', 'CaCl', 'Kalcium-Klorid'),
('Ca', 'CO', 'CaCO', 'Kalcium-Karbonat'),
('Ca', 'NO', 'CaNO', 'Kalcium-Nitrat'),
('Ca', 'OH', 'CaOH', 'Kalcium-Hidroxid (bazis)'),
('Ca', 'SO', 'CaSO', 'Kalcium-Szulfat'),
('H', 'Cl', 'HCl', 'Hidrogen-Klorid'),
('H', 'CO', 'HCO', 'Hidrogen-Karbonat'),
('H', 'NO', 'HNO', 'Hidrogen-Nitrat'),
('H', 'OH', 'HOH', 'Hidrogen-Hidroxid (viz)'),
('H', 'SO', 'HSO', 'Hidrogen-Szulfat'),
('K', 'Cl', 'KCl', 'Kalium-Klorid'),
('K', 'CO', 'KCO', 'Kalium-Karbonat'),
('K', 'NO', 'KNO', 'Kalium-Nitrat'),
('K', 'OH', 'KOH', 'Kalium-Hidroxid (bazis)'),
('K', 'SO', 'KSO', 'Kalium-Szulfat'),
('Mg', 'Cl', 'MgCl', 'Magnezium-Klorid'),
('Mg', 'CO', 'MgCO', 'Magnezium-Karbonat'),
('Mg', 'NO', 'MgNO', 'Magnezium-Nitrat'),
('Mg', 'OH', 'MgOH', 'Magnezium-Hidroxid (bazis)'),
('Mg', 'SO', 'MgSO', 'Magnezium-Szulfat'),
('Na', 'Cl', 'NaCl', 'Natrium-Klorid'),
('Na', 'CO', 'NaCO', 'Natrium-Karbonat'),
('Na', 'NO', 'NaNO', 'Natrium-Nitrat'),
('Na', 'OH', 'NaOH', 'Natrium-Hidroxid (bazis)'),
('Na', 'SO', 'NaSO', 'Natrium-Szulfat');

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
