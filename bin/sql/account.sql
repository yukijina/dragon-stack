CREATE TABLE account(
  id             SERIAL PRIMARY KEY,
  "usernameHash" CHARACTER(64),
  "passwordHash" CHARACTER(64),
  "sessionId"    CHARACTER(36)
);

-- secure password safely. converd plain text password to hased password - use camelcase so need double quote " "
-- sha256 = 256 one-bit value(sec.103 3:00)