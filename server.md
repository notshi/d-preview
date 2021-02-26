# how to install this code on a real server

setup local machine to connect to the server


add server details to ~/.ssh/config as portald, note we have set the 
server username to "ubuntu" which is a default for an install of ubuntu 
20.04

	nano ~/.ssh/config

and add the lines

	Host portald
	User ubuntu
	HostName portald.wetgenes.com
	ServerAliveInterval 60


copy ssh key to server, will ask for password to login

	ssh-copy-id portald



log into the server and enable passwordless sudo by editing the sudoers 
file on the server

	ssh portald

this will hopefully be the last time it asks for your password
	
	sudo nano /etc/sudoers

and add the line
	
	ubuntu ALL=(ALL) NOPASSWD:ALL


now we can pretty much forget the server password so can get to 
configuring it properly

install and enable byobu

	sudo apt-get install -y byobu
	byobu-enable
	exit
	
now reconnect and you should be in the byobu text window manager so 
make sure we have packages uptodate.

	sudo apt update
	sudo apt upgrade
	sudo apt-get install -y build-essential
	sudo apt-get install -y git

need to create a ssh key and makesure git knows it is us

	ssh-keygen
	cat ~/.ssh/id_rsa.pub

copypasta they key into github so we can access the repos

	https://github.com/settings/ssh/new

checkout this portald repo and cd into it

	git clone git@github.com:notshi/portald.git
	cd portald
	./git-pull

change the dportal default values by editing dportal/box/env.local.sh

	nano dportal/box/env.local.sh

and adding the following which will be used to install postgres and use a
different html directory

	export PGUSER="ubuntu"
	export PGPASS="*put*a*super*secret*password*here*"

	export DSTORE_STATICDIR="/home/ubuntu/dpreview/docs"
	export DSTORE_HOMEPAGE="/upload"

you can now install dportal from the dportal box directory

	dportal/box/install-all.sh

and build the dpreview site with

	./build

finally make sure we pickup the default env settings when we login so 
dportal is a little easier to manage. byobu mucks with this file so 
needs to be turned off and back on.

	byobu-disable
	echo "source /dportal/box/env.sh " >> /home/ubuntu/.profile
	byobu-enable
	source /dportal/box/env.sh

and we are good to go
