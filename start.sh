#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "Database is ready!"

# Run database migrations
flask db upgrade

python populate_db.py

# Start the Flask application
flask run --host=0.0.0.0