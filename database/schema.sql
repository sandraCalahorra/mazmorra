-- Importar con phpMyAdmin en una base de datos nueva llamada mazmorra.
-- No borra ni reemplaza datos existentes. Requiere tablas InnoDB.
CREATE DATABASE IF NOT EXISTS mazmorra CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mazmorra;
CREATE TABLE IF NOT EXISTS admins (
 id TINYINT UNSIGNED PRIMARY KEY,
 username VARCHAR(80) NOT NULL,
 password_hash VARCHAR(255) NOT NULL
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS products (
 id VARCHAR(80) PRIMARY KEY,
 data LONGTEXT NOT NULL,
 created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS games (
 id VARCHAR(80) PRIMARY KEY,
 title VARCHAR(160) NOT NULL,
 starts VARCHAR(30) NOT NULL,
 capacity INT UNSIGNED NOT NULL,
 price VARCHAR(80) NOT NULL,
 mode VARCHAR(100) NOT NULL,
 duration VARCHAR(100) NOT NULL,
 description TEXT NOT NULL,
 status VARCHAR(20) NOT NULL DEFAULT 'open',
 INDEX game_date(starts)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS reservations (
 id VARCHAR(80) PRIMARY KEY,
 game_id VARCHAR(80) NOT NULL,
 name VARCHAR(80) NOT NULL,
 contact VARCHAR(200) NOT NULL,
 players INT UNSIGNED NOT NULL,
 notes TEXT NOT NULL,
 status VARCHAR(20) NOT NULL DEFAULT 'pending',
 paid TINYINT UNSIGNED NOT NULL DEFAULT 0,
 created VARCHAR(30) NOT NULL,
 CONSTRAINT reservation_game FOREIGN KEY(game_id) REFERENCES games(id),
 INDEX reservation_status(game_id,status)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS settings (
 id TINYINT UNSIGNED PRIMARY KEY,
 data LONGTEXT NOT NULL
) ENGINE=InnoDB;
INSERT IGNORE INTO settings(id,data) VALUES(1,'{"whatsapp":"","paypal":"","email":"","delivery":"Entrega manual, en el plazo acordado con el autor."}');
CREATE TABLE IF NOT EXISTS rate_limits (
 bucket CHAR(64) PRIMARY KEY,
 hits INT UNSIGNED NOT NULL,
 expires BIGINT UNSIGNED NOT NULL
) ENGINE=InnoDB;
