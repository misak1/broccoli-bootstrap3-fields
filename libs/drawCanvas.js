/**
 * drawCanvas.js
 */
module.exports = function(broccoli, data, moduleList, targetElm, callback){
	if(!window){ callback(); return false; }
	if(!targetElm){ callback(); return false; }
	// console.log(data);
	// console.log(options);

	var _this = this;
	callback = callback || function(){};

	var it79 = require('iterate79');
	var path = require('path');
	var php = require('phpjs');
	var twig = require('twig');

	return;
}