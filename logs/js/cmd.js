#!/usr/bin/env node

let cmd=exports

let ls=function(a) { console.log(util.inspect(a,{depth:null})) }

cmd.opts={
}


cmd.parse=function(argv)
{
}

cmd.run=async function(argv)
{

	if( argv._[0]=="read" )
	{
		return await require("./stash.js").read_tsv( __dirname+"/../stash.tsv")
	}

	// help text
	console.log(
`
>	dpreview-logs read [filename.tsv]

	Read in the fresh data from upload tsv logs and save in our temporary json
	database, ignoring any duplicate lines and writing full day stats into
	stats/upload.json


`)
}

// if global.argv is set then we are inside another command so do nothing
if(!global.argv)
{
	var argv = require('minimist')(process.argv.slice(2),cmd.opts)
	
	global.argv=argv
	
	cmd.parse(argv)

	cmd.run(argv)
}
