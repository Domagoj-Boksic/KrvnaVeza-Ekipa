#!/usr/bin/env bash
set -euo pipefail

DB_NAME="krvnaVeza"

echo "Resetting database..."

dropdb -h localhost -p 5433 -U postgres \
    --if-exists "$DB_NAME"

createdb -h localhost -p 5433 -U postgres "$DB_NAME"

psql -h localhost -p 5433 -U postgres \
    -d "$DB_NAME" \
    -v ON_ERROR_STOP=1 \
    -f database/schema.sql

psql -h localhost -p 5433 -U postgres \
    -d "$DB_NAME" \
    -v ON_ERROR_STOP=1 \
    -f database/seed.sql

echo "Database reset successfully!"