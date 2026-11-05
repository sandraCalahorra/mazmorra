-- Ejecuta una sola vez en la base de datos de tu web.
ALTER TABLE reservations
  ADD COLUMN archived TINYINT(1) NOT NULL DEFAULT 0;
