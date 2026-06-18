-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2026 at 06:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `decorador_ambientes`
--

-- --------------------------------------------------------

--
-- Table structure for table `ambientes`
--

CREATE TABLE `ambientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `metros_cuadrados` int(11) NOT NULL,
  `cantidad_muebles` int(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ambientes`
--

INSERT INTO `ambientes` (`id`, `nombre`, `tipo`, `metros_cuadrados`, `cantidad_muebles`, `estado`) VALUES
(4, 'Living Principal', 'Sala de Estar', 28, 8, 'En Progreso'),
(5, 'Dormitorio Principal', 'Dormitorio', 20, 5, 'Finalizado'),
(6, 'Comedor Familiar', 'Comedor', 18, 4, 'Planificado'),
(7, 'Cocina Moderna', 'Cocina', 15, 6, 'En Progreso'),
(8, 'Oficina Personal', 'Oficina', 12, 3, 'Finalizado'),
(9, 'Baño Principal', 'Baño', 8, 2, 'Planificado');

-- --------------------------------------------------------

--
-- Table structure for table `mobiliario`
--

CREATE TABLE `mobiliario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `ambiente` varchar(100) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mobiliario`
--

INSERT INTO `mobiliario` (`id`, `nombre`, `categoria`, `ambiente`, `material`, `precio`) VALUES
(4, 'Sofá Chesterfield', 'Asientos', 'Living Principal', 'Fabric', 280000.00),
(5, 'Mesa Ratona', 'Mesas', 'Living Principal', 'Madera', 95000.00),
(6, 'Cama Queen', 'Dormitorio', 'Dormitorio Principal', 'Madera', 450000.00),
(7, 'Mesa de Comedor', 'Mesas', 'Comedor Familiar', 'Roble', 320000.00),
(8, 'Escritorio Ejecutivo', 'Oficina', 'Oficina Personal', 'Melamina', 180000.00),
(9, 'Biblioteca Moderna', 'Almacenamiento', 'Oficina Personal', 'Madera', 150000.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ambientes`
--
ALTER TABLE `ambientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobiliario`
--
ALTER TABLE `mobiliario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ambientes`
--
ALTER TABLE `ambientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `mobiliario`
--
ALTER TABLE `mobiliario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
