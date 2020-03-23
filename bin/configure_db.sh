#!/bin/bash
echo "Configureing dragondb"

dropdb -U node_user dragondb
createdb -U node_user dragondb

psql -U node_user dragondb < ./bin/sql/account.sql
psql -U node_user dragondb < ./bin/sql/generation.sql
psql -U node_user dragondb < ./bin/sql/dragon.sql
psql -U node_user dragondb < ./bin/sql/trait.sql
psql -U node_user dragondb < ./bin/sql/dragonTrait.sql

node ./bin/insertTraits.js

echo "dragondb configured!"
