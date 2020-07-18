#! /bin/sh
echo "Stopping Services..."
docker-compose down
docker-compose ps
echo "Stopping Containers..."
docker stop $(docker ps -q)
docker ps
