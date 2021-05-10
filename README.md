# d-preview
Generate a private d-preview site with IATI xml.

Upload from your computer, or use a link to a file that is on the web and easily create a preview of your data on a temporary site. Data will not be uploaded to the main live d-portal website.

This is a community hosted service. Read more about [how it came to be](https://medium.com/opendatacoop/announcing-d-preview-helping-organisations-check-their-iati-data-before-publishing-669b24ae20d).

## Upload methods
You can upload an xml file using a curl request. Values can be passed via post or query.  
**The current maximum upload size is set at 40mb.**

	curl -v -F "xml=@/full/path/to/file.xml" http://portald.wetgenes.com/upload

or

	curl -v -F "xmlurl=http://domain.name/path/to/file.xml" http://portald.wetgenes.com/upload

or

	curl -v http://portald.wetgenes.com/upload?xmlurl=http%3A%2F%2Fdomain.name%2Fpath%2Fto%2Ffile.xml
  
  
## Response

The response, assuming it worked will be a redirect to something like 
```01234567012345670123456701234567.portald.wetgenes.com``` where 
```01234567012345670123456701234567``` is the md5 key of the uploaded file so 
this URL can be calculated in advance.

**Note that the import will happen in the background.**

The current progress of an import can be queried like so

	http://01234567012345670123456701234567.portald.wetgenes.com/q?from=instance

The import log, *which will not be complete if import is ongoing*, can be found at

	http://01234567012345670123456701234567.portald.wetgenes.com/q?from=cronlog


If you would prefer a json or jsonp response then setting ```jsonplease=1``` 
will change the response

	curl -v http://portald.wetgenes.com/upload?xmlurl=http%3A%2F%2Fdomain.name%2Fpath%2Fto%2Ffile.xml\&jsonplease=1

## Stats
We have a [status page](https://stats.uptimerobot.com/8MWyWsgj7) and some [stats](https://notshi.github.io/d-preview/)!
