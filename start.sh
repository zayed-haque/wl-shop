#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.1
done
echo "Database is ready!"

# Run database migrations
flask db upgrade

# Start the Flask application
flask run --host=0.0.0.0