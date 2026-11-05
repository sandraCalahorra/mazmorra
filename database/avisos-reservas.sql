-- Ejecutar UNA VEZ en la base de datos de la web antes de copiar los PHP.
ALTER TABLE reservations
 ADD COLUMN rejection_reason TEXT NULL,
 ADD COLUMN rejection_email_status VARCHAR(24) NOT NULL DEFAULT 'none',
 ADD COLUMN rejection_notice_id VARCHAR(32) NULL,
 ADD COLUMN rejection_email_sent_at VARCHAR(30) NULL;
