/**
 * API: broccoli
 */
module.exports = function( data, callback, main, socket ){
	delete(require.cache[require('path').resolve(__filename)]);
	var path = require('path');

	data = data||{};
	callback = callback||function(){};
	var Broccoli = require('./../../../../libs/main.js');
	var broccoli = new Broccoli({
		'PlainHTMLElements': './testdata/PlainHTMLElements/',
		'testMod1': './testdata/modules1/',
		'testMod2': './testdata/modules2/'
	}, {
		'cd': path.resolve(__dirname, '../../../')+'/'
	});



	if(data.api == 'getPackageList'){
		broccoli.getPackageList(function(list){
			callback(list);
		});
		return ;

	}else if(data.api == 'buildHtml'){
		var json = require( path.resolve(__dirname, '../../frontend/editpage/index_files/guieditor.ignore/data.json') );
		broccoli.buildHtml(
			json.bowl.main ,
			{
				'mode': 'canvas',
				'realpath': path.resolve(__dirname, '../../frontend/editpage/index.html'),
				'realpathJson': path.resolve(__dirname, '../../frontend/editpage/index_files/guieditor.ignore/data.json'),
				'resourceDir': path.resolve(__dirname, '../../frontend/editpage/index_files/guieditor.ignore/resources/'),
				'resourceDist': path.resolve(__dirname, '../../frontend/editpage/index_files/resources/')
			} ,
			function(html){
				// console.log(html);
				callback(html);
			}
		);
		return ;

	}

	setTimeout(function(){
		data.messageByBackend = 'callbacked by backend API "broccoli".';
		callback(data);
	}, 1000);
	return;
}
