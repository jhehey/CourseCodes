#! /bin/sh
# https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04

# setup nginx
sudo apt install nginx
sudo ufw app list
sudo ufw allow 'Nginx HTTP'
sudo ufw enable
sudo ufw status

# setup the reverse proxy
unlink /etc/nginx/sites-enabled/default
cp ./reverse-proxy.conf /etc/nginx/sites-available/reverse-proxy.conf
ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf
nginx -t
service nginx restart
