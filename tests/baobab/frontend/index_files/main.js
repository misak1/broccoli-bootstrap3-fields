(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * node-iterate79
 */
(function(exports){

	/**
	 * 配列の直列処理
	 */
	exports.ary = function(ary, fnc, fncComplete){
		return new (function( ary, fnc, fncComplete ){
			this.idx = -1;
			this.idxs = [];
			for( var i in ary ){
				this.idxs.push(i);
			}
			this.ary = ary||[];
			this.fnc = fnc||function(){};
			this.fncComplete = fncComplete||function(){};

			this.next = function(){
				if( this.idx+1 >= this.idxs.length ){
					this.fncComplete();
					return this;
				}
				this.idx ++;
				this.fnc( this, this.ary[this.idxs[this.idx]], this.idxs[this.idx] );
				return this;
			}
			this.next();
		})(ary, fnc, fncComplete);
	}

	/**
	 * 関数の直列処理
	 */
	exports.fnc = function(aryFuncs){
		var mode = 'explicit';
		var defaultArg = undefined;
		if( arguments.length >= 2 ){
			mode = 'implicit';
			defaultArg = arguments[0];
			aryFuncs = arguments[arguments.length-1];
		}


		function iterator( aryFuncs ){
			aryFuncs = aryFuncs||[];

			var idx = 0;
			var funcs = aryFuncs;
			var isStarted = false;//2重起動防止

			this.start = function(arg){
				if(isStarted){return this;}
				isStarted = true;
				return this.next(arg);
			}

			this.next = function(arg){
				arg = arg||{};
				if(funcs.length <= idx){return this;}
				(funcs[idx++])(this, arg);
				return this;
			};
		}
		var rtn = new iterator(aryFuncs);
		if( mode == 'implicit' ){
			return rtn.start(defaultArg);
		}
		return rtn;
	}


})(exports);

},{}],2:[function(require,module,exports){
// console.log(broccoli);

/**
 * main.js
 */
window.main = new (function(){
	var _this = this;
	var it79 = require('iterate79');
	var socket = this.socket = window.baobabFw
		.createSocket(
			this,
			io,
			{
				'showSocketTest': function( data, callback, main, socket ){
					// console.log(data);
					// alert(data.message);
					// console.log(callback);
					callback(data);
					return;
				}
			}
		)
	;
	var broccoli = new Broccoli();

	this.init = function(){
		// this.socketTest();
		it79.fnc(
			{},
			[
				function( it1, data ){
					// パッケージ・モジュール一覧を取得
					_this.socket.send(
						'broccoli',
						{
							'api': 'getPackageList'
						},
						function(packageList){
							// console.log(packageList);
							data.packageList = packageList;
							it1.next(data);
						}
					);
				} ,
				function( it1, data ){
					// モジュールパレットを初期化
					broccoli.drawModulePalette(data.packageList, document.getElementById('palette'), function(){
						console.log('palette standby.');
						it1.next(data);
					});
				} ,
				function( it1, data ){
					// 編集画面描画
					_this.socket.send(
						'broccoli',
						{
							'api': 'buildHtml'
						},
						function(html){
							// console.log(html);
							$('.contents', $('iframe').get(0).contentWindow.document).html(html);

							console.log('HTML standby.');
							it1.next(data);
						}
					);
				} ,
				function( it1, data ){
					// パネル描画
					broccoli.drawPanels(
						$('#panels').get(0),
						$('.contents', $('iframe').get(0).contentWindow.document).get(0),
						{
							'select': function(instancePath){
								console.log('select: '+instancePath);
							} ,
							'edit': function(instancePath){
								console.log('edit: '+instancePath);
							} ,
							'drop': function(instancePath, method){
								console.log(instancePath);
								console.log(method);
							} ,
							'remove': function(instancePath){
								console.log(instancePath);
							}
						},
						function(){
							it1.next(data);
						}
					);
				}
			]
		);
	}

	/**
	 * WebSocket疎通確認
	 */
	this.socketTest = function(){
		socket.send(
			'socketTest',
			{'message': 'socketTest from frontend.'} ,
			function(data){
				console.log(data);
				// alert('callback function is called!');
			}
		);
		return this;
	}

})();

},{"iterate79":1}]},{},[2])