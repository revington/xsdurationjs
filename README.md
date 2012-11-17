[![build status](https://secure.travis-ci.org/revington/xsdurationjs.png)](http://travis-ci.org/revington/xsdurationjs)
xsdurationjs
============

> Implementation of [adding duration to datetime](http://www.w3.org/TR/xmlschema-2/#adding-durations-to-dateTimes)

Install
-------

node.js:

	$ npm install xsdurationjs

Browser:
Download xsdurationjs to your js directory and put a script tag

	<script type="text/javascript" src="/js/xsduration.js"></script>

It does not have any dependency.

synopsis
--------

	// node.js
	var xsduration = require('xsdurationjs');
	
	var r =	xsduration.add('P5M', new Date(2012,0,1);
	console.log(r); // puts Thu, 31 May 2012 22:00:00 GMT

	// browser
	<script type="text/javascript" src="/js/xsduration.js"></script>
	<script type="text/javascript">
		var r =	xsduration.add('P5M', new Date(2012,0,1);
	</script>

License
-------
MIT. See LICENSE file.

