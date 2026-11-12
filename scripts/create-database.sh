#!/usr/bin/env bash
set -euo pipefail

DB_NAME="krvnaVeza"

echo "Creating database..."

psql -h localhost -p 5433 -U postgres -d postgres \
    -tc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" |
    grep -q 1 || \
    createdb -h localhost -p 5433 -U postgres "$DB_NAME"

echo "Database created successfully."