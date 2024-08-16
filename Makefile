.PHONY: build run test clean migrate populate frontend frontend-install frontend-build run-all stop-all frontend-test frontend-lint test-all

# Build the Docker image
build:
	docker-compose build

# Run the application
run:
	docker-compose up

# Run tests
test:
	docker-compose run --rm web pytest

# Clean up Docker resources
clean:
	docker-compose down -v

# Run database migrations
migrate:
	docker-compose run --rm web flask db upgrade

# Populate the database with sample data
populate:
	docker-compose run --rm web python populate_db.py

# Enter the web container shell
shell:
	docker-compose run --rm web /bin/bash

# Show logs
logs:
	docker-compose logs -f

# Start a PostgreSQL shell
db-shell:
	docker-compose exec db psql -U user -d wl_shop_db

# Install frontend dependencies
frontend-install:
	cd wl_shop_frontend && npm install

# Run frontend development server
frontend:
	cd wl_shop_frontend && npm start

# Build frontend for production
frontend-build:
	cd wl_shop_frontend && npm run build

# Run both backend and frontend
run-all:
	docker-compose up -d
	$(MAKE) frontend

# Stop both backend and frontend
stop-all:
	docker-compose down
	pkill -f "npm start"

# Run frontend tests
frontend-test:
	cd wl_shop_frontend && npm test

# Lint frontend code
frontend-lint:
	cd wl_shop_frontend && npm run lint

# Run all tests (backend and frontend)
test-all:
	$(MAKE) test
	$(MAKE) frontend-test