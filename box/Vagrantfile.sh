
sudo apt-get update

echo " install build system "

sudo apt-get install -y build-essential

echo " setting default DSTORE_PG , must be done before byobu breaks .profile "
echo "export DSTORE_PG=\"?\" " >> /home/vagrant/.profile
echo "export DSTORE_PGRO=\"postgres://readonly:secret@localhost:5432/dstore\" " >> /home/vagrant/.profile
echo "export DSTORE_DEBUG=1 " >> /home/vagrant/.profile

echo " install and enable byobu "

sudo apt-get install -y byobu
sudo -u vagrant -H bash -c "byobu-enable"


echo " we will use /portald on live server "
sudo ln -s /host /portald

echo " installing all "
bash /host/box/all.sh

echo
echo " test this server at http://10.42.52.99/ "
echo

