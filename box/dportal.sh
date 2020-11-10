cd `dirname $0`

npm install -g forever

mkdir /portald/logs

cp dportal-initd /etc/init.d/dportal

update-rc.d dportal defaults
update-rc.d dportal enable

/etc/init.d/dportal start

