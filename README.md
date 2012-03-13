xsdurationjs
====

> Implementation of [adding duration to datetime](http://www.w3.org/TR/xmlschema-2/#adding-durations-to-dateTimes)
synopsis
--------
	var xsduration = require('xsdurationjs');
	
	var r =	xsduration.add('P5M',new Date(2012,0,1);
	console.log(r); // puts Thu, 31 May 2012 22:00:00 GMT

