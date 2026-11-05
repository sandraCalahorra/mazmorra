CREATE TABLE IF NOT EXISTS game_requests (
 id CHAR(32) PRIMARY KEY,
 user_id VARCHAR(80) NULL,
 name VARCHAR(80) NOT NULL,
 contact VARCHAR(200) NOT NULL,
 title VARCHAR(200) NOT NULL,
 starts VARCHAR(30) NOT NULL,
 duration INT NOT NULL,
 status VARCHAR(20) NOT NULL DEFAULT 'pending',
 archived TINYINT(1) NOT NULL DEFAULT 0,
 paid TINYINT(1) NOT NULL DEFAULT 0,
 rejection_reason TEXT NULL,
 rejection_email_status VARCHAR(24) NOT NULL DEFAULT 'none',
 data LONGTEXT NOT NULL,
 created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 INDEX request_user (user_id),
 INDEX request_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
