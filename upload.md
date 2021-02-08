# how to upload


Upload an xml file using a curl POST request.

	curl -v -F "xml=@/full/path/to/file.xml" http://portald.wetgenes.com/upload

The response, assuming it worked will be a redirect to something like 
01234567012345670123456701234567.portald.wetgenes.com where 
01234567012345670123456701234567 is the md5 key of the uploaded file so 
this URL can be easily calculated without uploading a file.

Note that the import will happen in the background, the current 
progress of an import can be queried like so

	http://01234567012345670123456701234567.portald.wetgenes.com/q?from=instance

The import log can also be found at

	http://01234567012345670123456701234567.portald.wetgenes.com/q?from=cronlog

