#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database..."

python populate_db.py

# Run database migrations
flask db upgrade

# Start the Flask application
flask run --host=0.0.0.0
