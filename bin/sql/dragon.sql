CREATE TABLE dragon(
  id             SERIAL PRIMARY KEY,
  birthdate      TIMESTAMP NOT NULL,
  nickname       VARCHAR(64),
  "isPublic"    BOOLEAN NOT NULL,
  "setValue"    INTEGER NOT NULL,
  "sireValue"   INTEGER NOT NULL,
  "generationId" INTEGER,
  FOREIGN KEY    ("generationId") REFERENCES generation(id)
);

-- nickname max 64 charactors 
-- SQL changes char to all lowercase. By using double quotation " ", we can preserve camel case