module.exports = function(broccoli){

	require('m-util');
	var it79 = require('iterate79');
	var php = require('phpjs');
	var resouce = require('br-resouce');
	var mLog = require('m-log');
	var _ = require('underscore');
	// require('./bootstrap3-button-var.js');
	var _badgeLabel = 'new';
	var _resMgr = broccoli.resourceMgr;
	var _this = this;


	/**
	 * プレビュー用の簡易なHTMLを生成する
	 */
	this.mkPreviewHtml = function( fieldData, mod, callback ){
		console.log('mkPreviewHtml', 'client');
		var rtn = {}
		if( typeof(fieldData) === typeof({}) ){
			rtn = fieldData;
		}
		_resMgr.getResource( rtn.resKeyEditPng, function(res){
			callback(rtn.get(0).outerHTML);
		} );
		return;
	}

	/**
	 * データを正規化する
	 */
	this.normalizeData = function( fieldData, mode ){
		var rtn = fieldData;
		if( typeof(fieldData) !== typeof({}) ){
			rtn = {
				"fields":{
					"badge-label": _badgeLabel
				}
			};
		}
		return rtn;
	}

	/**
	 * エディタUIを生成
	 */
	this.mkEditor = function( mod, data, elm, callback ){
		var rtn = $('<div class="bs3-button-field">');
console.log('data', data);

		// badge-label
		rtn.append('<h3>badge-label</h3>').append($('<div class="bs-badgeLabel">').append($('<input type="text" name="badgeLabel">')));
		$(elm).html(rtn);

		// 描画後の処理
		$('input[name="badgeLabel"]').val(data.fields['badge-label']);

		callback();
		return;
	}

	/**
	 * データを複製する
	 */
	this.duplicateData = function( data, callback ){
		data = JSON.parse( JSON.stringify( data ) );
		it79.fnc(
			data,
			[
				function(it1, data){
					_resMgr.duplicateResource( data.resKey, function(newResKey){
						data.resKey = newResKey;
						it1.next(data);
					} );
				} ,
				function(it1, data){
					_resMgr.getResourcePublicPath( data.resKey, function(publicPath){
						data.PngPath = publicPath;
						it1.next(data);
					} );
				} ,
				function(it1, data){
					callback(data);
					it1.next(data);
				}
			]
		);
		return;
	}// this.duplicateData

	/**
	 * エディタUIで編集した内容を保存
	 */
	this.saveEditorContent = function( elm, data, mod, callback ){
		console.log('saveEditorContent');
		var _this = this;
		var resInfo;
		var $dom = $(elm);
		if( typeof(data) !== typeof({}) ){
			data = {};
		}
		data.fields['badge-label'] = $dom.find('input[name="badgeLabel"]').val();
		callback(data);
	}// this.saveEditorContent()
}
