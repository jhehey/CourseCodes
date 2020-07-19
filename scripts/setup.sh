#! /bin/sh

echo "Building Containers..."
sudo sh ./buildcpp.sh

echo "Building Services..."
sudo docker-compose -f ../docker-compose.prod.yml up -d --build
sudo docker-compose ps
