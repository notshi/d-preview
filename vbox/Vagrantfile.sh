
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



echo " apt install node npm"

sudo apt-get install -y npm
sudo apt-get install -y nodejs


echo " install postgres "

sudo apt-get install -y postgresql
sudo apt-get install -y postgresql-contrib

# this hack will probably get us the version number...
PGVER=`ls /etc/postgresql/`

sudo pg_dropcluster --stop $PGVER main
sudo pg_createcluster --locale en_US.UTF-8 --start $PGVER main


echo " attempting to setup postgres "

PGMAIN=/etc/postgresql/$PGVER/main
PGUSER=vagrant
PGPASS=vagrant

echo '#HAXTBH' >> $PGMAIN/postgresql.conf
echo 'max_wal_senders=1' >> $PGMAIN/postgresql.conf
echo 'wal_level=hot_standby' >> $PGMAIN/postgresql.conf
echo 'synchronous_commit = off' >> $PGMAIN/postgresql.conf
echo 'work_mem = 128MB' >> $PGMAIN/postgresql.conf

echo '#HAXTBH' >> $PGMAIN/pg_hba.conf
echo "hostssl dstore readonly 127.0.0.1/32 md5" >> $PGMAIN/pg_hba.conf
echo 'local replication all peer' >> $PGMAIN/pg_hba.conf
/etc/init.d/postgresql restart


echo ' creating postgres users only not databases which are created later '

sudo -u postgres bash -c "psql -c \"CREATE USER $PGUSER WITH SUPERUSER PASSWORD '$PGPASS';\""
sudo -u postgres bash -c "psql -c \"CREATE USER readonly WITH LOGIN PASSWORD 'secret' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION VALID UNTIL 'infinity';\""

