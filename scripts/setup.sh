#! /bin/sh
$Env:PGPASSWORD="S2MognJhsZUnwY8LY8neenn2yUKmXMyLD5QTH9mFWhU"

echo "Building Containers..."
sudo sh ./buildcpp.sh

echo "Building Services..."
sudo docker-compose -f ../docker-compose.prod.yml up -d --build

echo "Running Migrations..."
sudo sh ./migrate.sh
sudo docker-compose ps
