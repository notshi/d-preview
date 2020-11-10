cd `dirname $0`

npm install -g forever

cp dportal-initd /etc/init.d/dportal

update-rc.d dportal defaults
update-rc.d dportal enable

/etc/init.d/dportal start

