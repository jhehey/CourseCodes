#! /bin/sh
echo "Stopping Services and Removing Volumes..."
sudo docker-compose down -v
sudo docker-compose ps
echo "Stopping Containers..."
sudo docker stop $(docker ps -q)
sudo docker ps
