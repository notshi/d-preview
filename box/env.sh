
DIRNAME=`dirname $0`


export DSTORE_PG="?"
export DSTORE_PGRO="postgres://readonly:secret@localhost:5432/dstore"
export PGUSER="vagrant"
export PGDATABASE="dstore"
export PGHOST="/var/run/postgresql"


# use this file to override the above with local system values


if test -f "$DIRNAME/env.local.sh"; then

source "$DIRNAME/env.local.sh"

fi
