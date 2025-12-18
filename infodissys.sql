-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2025 at 11:07 AM
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
-- Database: `infodissys`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `what` varchar(255) NOT NULL,
  `when` varchar(255) NOT NULL,
  `where` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `what`, `when`, `where`, `details`, `created_at`) VALUES
(1, 'Libre Tuli In Kap', '2025-12-14 17:45:05', '#3 Barangay covered court', 'Licensed doctors and nurses will perform the procedure. Free medicines and wound care instructions will be provided. Parents are encouraged to accompany their children. This program is organized by the Barangay Health Office in partnership with the local government.', '2025-12-14 09:48:04'),
(9, 'PA Siba ni Kap', 'Dec 20 1pm - 4pm', 'Sa Mansyon ni Kap', 'Mapa kaon si kap ta gana sa bulang sa manok', '2025-12-15 13:01:53');

-- --------------------------------------------------------

--
-- Table structure for table `baroffusers`
--

CREATE TABLE `baroffusers` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baroffusers`
--

INSERT INTO `baroffusers` (`id`, `firstName`, `lastName`, `userName`, `password`, `role`) VALUES
(1, 'Alexandrie', 'Alondra', 'drie', 'staff', 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `resphonenum`
--

CREATE TABLE `resphonenum` (
  `id` int(11) NOT NULL,
  `PhoneNum` varchar(11) NOT NULL,
  `PurokNum` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resphonenum`
--

INSERT INTO `resphonenum` (`id`, `PhoneNum`, `PurokNum`) VALUES
(54, '09090909090', '4'),
(55, '09090909090', '2'),
(56, '09090909090', '4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `baroffusers`
--
ALTER TABLE `baroffusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resphonenum`
--
ALTER TABLE `resphonenum`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `baroffusers`
--
ALTER TABLE `baroffusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `resphonenum`
--
ALTER TABLE `resphonenum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
