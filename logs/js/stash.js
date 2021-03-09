let stash=exports;

let fs=require("fs")
let util=require("util")

let stringify = require('json-stable-stringify')

let stats = require('./stats.js')

let ls=function(a) { console.log(util.inspect(a,{depth:null})) }

stash.read_json=function()
{
	let db={}
	
	try{
		db=JSON.parse( fs.readFileSync( __dirname+"/../stash.json" ) )
	}catch(e){}

	return stash.clean(db)
}

stash.write_json=function(db)
{
	fs.writeFileSync( __dirname+"/../stash.json" , stringify(db,{space:" "}) )
}	

stash.get_day_logs=function(db,day)
{
	let dmin=Math.floor(day)*60*60*24
	let dmax=dmin+60*60*24
	let daylogs=[]
	for(let t of db.logs)
	{
		if( ( t[0] >= dmin ) && ( t[0] < dmax ) ) // withinday
		{
			daylogs[daylogs.length]=t
		}
	}
	return daylogs
}

stash.remove_old_day_logs=function(db,day)
{
	let dmin=Math.floor(day+1)*60*60*24
	let logs=[]
	for(let v of db.logs)
	{
		if( v[0] >= dmin ) // remove old days
		{
			logs[logs.length]=v
		}
	}
	db.logs=logs // replace array
}


// sort and remove duplicates
stash.clean=function(db)
{
	db.logs=db.logs || []

	db.logs.sort(function(a,b) { return a[0]-b[0] })

	let cmp=function(a,b)
	{
		if( Array.isArray(a) && Array.isArray(b) )
		{
			if(a.length==b.length)
			{
				for(let i in a)
				{
					if( a[i] !== b[i] ) { return false }
				}
				return true
			}
		}
		return false
	}
	let logs=[]
	let last=undefined
	for(let v of db.logs)
	{
		if( ! cmp(last,v) ) // remove dupes
		{
			logs[logs.length]=v
		}
		last=v
	}
	db.logs=logs // replace array

	return db
}


stash.read_tsv=function(fname)
{
	let db=stash.read_json()
	
	let dat=fs.readFileSync(fname,"utf8")
	let lines=dat.split("\n")
	for( let line of lines )
	{
		let aa=line.split("\t")
		aa[0]=parseFloat(aa[0])
		if( ( typeof aa[0] == "number" ) && aa[0]==aa[0] ) // valid number
		{
			db.logs[db.logs.length]=aa
		}
	}
	stash.clean(db)

	let maxday=Math.floor( db.logs[db.logs.length-1][0] / (60*60*24) )
	let minday=Math.floor( db.logs[0][0] / (60*60*24) )

	st=stats.read()

	for(let day=minday;day<maxday;day++)
	{
		console.log( day + " : " + new Date( day*60*60*24*1000) )
		let daylogs=stash.get_day_logs(db,day)
		ls(daylogs)
	}

	stats.write(st)

	stash.remove_old_day_logs(db,maxday-1)

	stash.write_json(db)
}
