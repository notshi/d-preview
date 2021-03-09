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
	fs.writeFileSync( __dirname+"/../stats/upload.json" , stringify(db,{space:" "}) )
}	

stats.clean=function(st)
{
	return st
}
