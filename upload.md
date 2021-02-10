# how to upload


Upload an xml file using a curl request. Values can be passed via post 
or query.

	curl -v -F "xml=@/full/path/to/file.xml" http://portald.wetgenes.com/upload

or

	curl -v -F "xmlurl=http://domain.name/path/to/file.xml" http://portald.wetgenes.com/upload

or

	curl -v http://portald.wetgenes.com/upload?xmlurl=http%3A%2F%2Fdomain.name%2Fpath%2Fto%2Ffile.xml

The response, assuming it worked will be a redirect to something like 
01234567012345670123456701234567.portald.wetgenes.com where 
01234567012345670123456701234567 is the md5 key of the uploaded file so 
this URL can be calculated in advance.

Note that the import will happen in the background, the current 
progress of an import can be queried like so

	http://01234567012345670123456701234567.portald.wetgenes.com/q?from=instance

The import log, which will not be complete if import is ongoing, can also be found at

	http://01234567012345670123456701234567.portald.wetgenes.com/q?from=cronlog


If you would prefer a json or jsonp response then setting jsonplease=1 
will change the response

	curl -v http://portald.wetgenes.com/upload?xmlurl=http%3A%2F%2Fdomain.name%2Fpath%2Fto%2Ffile.xml\&jsonplease=1

