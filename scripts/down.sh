#! /bin/sh
echo "Stopping Services..."
sudo docker-compose down
sudo docker-compose ps
echo "Stopping Containers..."
sudo docker stop $(docker ps -q)
sudo docker ps
