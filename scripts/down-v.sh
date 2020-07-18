#! /bin/sh
echo "Stopping Services and Removing Volumes..."
docker-compose down -v
docker-compose ps
echo "Stopping Containers..."
docker stop $(docker ps -q)
docker ps
