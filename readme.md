# muks

multiplexes a stream by creating multiple `stream.PassThrough` streams and writing all chunks to them. 

## usage

``` javascript
const muks = require("muks");

somestream.pipe(muks(
	
	function(stream1){
		stream1.on("data", console.log);
	},

	function(stream2){
		stream2.pipe(somewhere);
	},
	
	function(stream3){
		stream3.pipe(somewhere_else);
	},
	
	// ...
	
))
```

