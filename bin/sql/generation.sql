-- Create a table of generation - table name: singular
CREATE TABLE generation(
  id         SERIAL PRIMARY KEY, 
  expiration TIMESTAMP NOT NULL
  );