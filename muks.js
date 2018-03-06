#!/usr/bin/env node

var streams = require("streams");

module.exports = function(){

	// create a passthrough stream for every callback argument
	var streams = Array.from(arguments).filter(function(fn){
		return (typeof fn === 'function');
	}).map(function(fn){
		return (function(stream, fn){
			return fn(stream), stream;
		})(new stream.PassThrough, fn);
	});
	
	// return a writable stream
	return (new stream.Writable({
		write: function(chunk, encoding, done) {
			// write chunk to every stream
			streams.forEach(function(stream){
				stream.write(chunk);
			}), done();
		},
		final: function(done) {
			// when input is finalized, end every stream
			streams.forEach(function(stream){
				stream.end();
			}), done();
		}
	}));
	
};
