#!/bin/bash

# KBase Setup Script

echo "Setting up KBase development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Start the services
echo "Starting Docker services..."
docker-compose -f docker/docker-compose.yml up -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 10

# Run database migrations (if any)
echo "Running database setup..."
# Add migration commands here

echo "Setup complete! Services are running:"
echo "- PostgreSQL: localhost:5432"
echo "- Backend: http://localhost:8080"
echo "- Frontend: http://localhost:3000"

echo "To stop services: docker-compose -f docker/docker-compose.yml down"