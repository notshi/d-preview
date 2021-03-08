#!/usr/bin/env node

let tsv=exports;

let fs=require("fs")
let util=require("util")

let ls=function(a) { console.log(util.inspect(a,{depth:null})) }


tsv.read=function(fname)
{
	let dat=fs.readFileSync(fname,"utf8")
	let lines=dat.split("\n")
	for( let line of lines )
	{
		let aa=line.split("\t")

		ls(aa)
	}
}
