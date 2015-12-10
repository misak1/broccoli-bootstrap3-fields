module.exports = function(broccoli){

	require('m-util');
	var it79 = require('iterate79');
	var php = require('phpjs');
	var resouce = require('br-resouce');
	var mLog = require('m-log');
	var _ = require('underscore');
	require('./bootstrap3-labels-var.js');
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
					"label-label": _labelLabel,
					"label-style" :_labelStyle[0].value
				}
			};
		}
		return rtn;
	}

	/**
	 * エディタUIを生成
	 */
	this.mkEditor = function( mod, data, elm, callback ){
		var rtn = $('<div class="bs3-labels-field">');
console.log('data', data);
		// label-label
		rtn.append('<h3>label-label</h3>').append($('<div class="bs-labelLabel">').append($('<input type="text" name="labelLabel">')));

		// label-style
		var htmlBtnStyle = '		<li style="display:inline-block; vertical-align:bottom; margin-left:.7em;">			<label>				<input type="radio" name="labelStyle" value="<%= styleVal %>" style="display:block;">				<span class="label <%= styleVal %>" type="label"><%= styleLbl %></span>			</label>		</li>';
		// var htmlBtnStyle = (function() {/*
		// <li style="display:inline-block; vertical-align:bottom; margin-left:.7em;">
		// 	<label>
		// 		<input type="radio" name="labelStyle" value="<%= styleVal %>" style="display:block;">
		// 		<span class="label <%= styleVal %>" type="label"><%= styleLbl %></span>
		// 	</label>
		// </li>
		// */}).toString().uHereDoc();
		var _htmlBtnStyle = _.template(htmlBtnStyle);
		$ulBtnStyle = $('<ul>');
		for (var style_i = 0; style_i < _labelStyle.length; style_i++) {
			$ulBtnStyle.append($(_htmlBtnStyle({
				'styleVal': _labelStyle[style_i].value,
				'styleLbl': _labelStyle[style_i].label
			})));
		}
		rtn.append('<h3>label-style</h3>').append($('<div class="bs-labelStyle">').append($ulBtnStyle));

		$(elm).html(rtn);

		// 描画後の処理
		$('input[name="labelLabel"]').val(data.fields['label-label']);

		// labelStyle
		_default_val = $('input[name="labelStyle"]').get(0).value;
		_checked_val = data.fields['label-style'];
		if(_checked_val !== _default_val){
			$('input[name="labelStyle"][value="' + _checked_val +'"]').prop('checked', true);
		}else{
			$('input[name="labelStyle"][value="' + _default_val +'"]').prop('checked', true);
		}

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
		data.fields['label-label'] = $dom.find('input[name="labelLabel"]').val();
		data.fields['label-style'] = $dom.find('input[name="labelStyle"]:checked').val();
		callback(data);
	}// this.saveEditorContent()
}
