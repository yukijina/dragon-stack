#!/bin/bash
echo "Configureing dragondb"

dropdb -U node_user dragondb
createdb -U node_user dragondb

psql -U node_user dragondb < ./bin/sql/generation.sql
psql -U node_user dragondb < ./bin/sql/dragon.sql

echo "dragondb configured!"
