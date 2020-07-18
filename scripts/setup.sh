#! /bin/sh
$Env:PGPASSWORD="S2MognJhsZUnwY8LY8neenn2yUKmXMyLD5QTH9mFWhU"

echo "Building Containers..."
./buildcpp.sh

echo "Building Services..."
docker-compose -f ../docker-compose.prod.yml up -d --build

echo "Running Migrations..."
./migrate.sh
docker-compose ps
