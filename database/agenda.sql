-- Importar una vez en la base de datos existente. No borra datos.
CREATE TABLE IF NOT EXISTS agenda_settings (
 id TINYINT UNSIGNED PRIMARY KEY,
 data LONGTEXT NOT NULL
) ENGINE=InnoDB;
INSERT IGNORE INTO agenda_settings(id,data) VALUES(1,'{"enabled":false,"step":15,"weekly":{"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[]},"blocks":[]}');
-- La lista de espera utiliza status='waitlisted', admitido por el VARCHAR existente.
