[![build status](https://secure.travis-ci.org/revington/xsdurationjs.png)](http://travis-ci.org/revington/xsdurationjs)
# xsdurationjs

A w3c [adding duration to datetime](http://www.w3.org/TR/xmlschema-2/#adding-durations-to-dateTimes) implementation for node and the browser with no dependencies.

## node.js:

	// Install
	$ npm install xsdurationjs

	// Require
	var xsduration = require('xsdurationjs');

## Browser:

Download [xsduration-0.0.2.min.js](https://raw.githubusercontent.com/revington/xsdurationjs/master/xsduration-0.0.2.min.js) to your scripts directory and include it with a script tag.

	<script type="text/javascript" src="/js/xsduration-0.0.2.min.js"></script>

It does not have any dependency.

synopsis
--------

	
	// Add five months
	var r =	xsduration.add('P5M', new Date(2012,0,1);

	// Add five years and five months
	var r =	xsduration.add('P5Y5M', new Date(2012,0,1);

License
-------
MIT. See LICENSE file.

