cd `dirname $0`

echo " installing nginx and configurations "

sudo apt-get install -y nginx

cp ./nginx-default /etc/nginx/sites-enabled/default

sudo systemctl reload nginx




