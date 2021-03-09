let stats=exports;

let fs=require("fs")
let util=require("util")

let stringify = require('json-stable-stringify')

let ls=function(a) { console.log(util.inspect(a,{depth:null})) }

stats.read_json=function()
{
	let st={}
	
	try{
		st=JSON.parse( fs.readFileSync( __dirname+"/../stats/upload.json" ) )
	}catch(e){}

	return stats.clean(st)
}

stats.write_json=function(st)
{
	fs.writeFileSync( __dirname+"/../stats/upload.json" , stringify(st,{space:" "}) )
}	

stats.clean=function(st)
{
	st.daymin=st.daymin || 0xffffffff
	st.daymax=st.daymax || 0x00000001


	return st
}


stats.add_day_stats=function(st,day,logs)
{

	if(st.daymin>day) { st.daymin=day }
	if(st.daymax<day) { st.daymax=day }

	for(let n of [
			"visits",
			"ips",
			"errors",
			"uploads",
			"uploads_by_url",
			"uploads_total_size",
			"uploads_max_size",
			"uploads_ignored",
			"uploads_ignored_total_size",
		])
	{
		st[n]=st[n] || {}
	}

	let ips={}
	let ips_count=function()
	{
		let total=0
		for(let i in ips)
		{
			let n=ips[i]
			total=total+n
		}
		return total
	}


	ips={}
	let visits=0
	for(let l of logs)
	{
		if( l[2]=="visit" )
		{
			visits=visits+1
			ips[ l[1] ]=1
		}
	}
	st.visits[day]=visits
	st.ips[day]=ips_count()
	

	let errors=0
	for(let l of logs)
	{
		if( l[2]=="error" )
		{
			errors=errors+1
		}
	}
	st.errors[day]=errors

	let uploads=0
	let uploads_by_url=0
	let uploads_ignored=0
	let uploads_total_size=0
	let uploads_ignored_total_size=0
	let uploads_max_size=0
	for(let l of logs)
	{
		if( l[2]=="upload" )
		{
			let size=parseInt(l[3])||0
			uploads+=1
			uploads_total_size+=size
			if( size > uploads_max_size ) { uploads_max_size=size }
		}
		else
		if( l[2]=="fetch" )
		{
			let size=parseInt(l[3])||0
			uploads=uploads+1
			uploads_by_url+=1
			uploads_total_size+=size
			if( size > uploads_max_size ) { uploads_max_size=size }
		}
		else
		if( l[2]=="duplicate" )
		{
			let size=parseInt(l[3])||0
			uploads_ignored+=1
			uploads_ignored_total_size+=size
		}
	}
	st.uploads[day]=uploads
	st.uploads_by_url[day]=uploads_by_url
	st.uploads_ignored[day]=uploads_ignored
	st.uploads_total_size[day]=uploads_total_size
	st.uploads_ignored_total_size[day]=uploads_ignored_total_size
	st.uploads_max_size[day]=uploads_max_size

	return st
}
