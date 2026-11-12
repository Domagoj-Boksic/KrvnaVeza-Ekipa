#!/usr/bin/env bash
set -euo pipefail

DB_NAME="krvnaVeza"

echo "Seeding database..."

psql -h localhost -p 5433 -U postgres \
    -d "$DB_NAME" \
    -v ON_ERROR_STOP=1 \
    -f database/seed.sql

echo "Database seeded successfully."
