module.exports = function(broccoli){

	require('m-util');
	var it79 = require('iterate79');
	var php = require('phpjs');
	var resouce = require('br-resouce');
	var mLog = require('m-log');
	var _ = require('underscore');
	require('./bootstrap3-alert-var.js');
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
					"alert-title": _alertTitle,
					"alert-message": _alertMessage,
					"alert-style" :_alertStyle[0].value
				}
			};
		}
		return rtn;
	}

	/**
	 * エディタUIを生成
	 */
	this.mkEditor = function( mod, data, elm, callback ){
		var rtn = $('<div class="bs3-alert-field">');
console.log('data', data);
		// alert-title
		rtn.append('<h3>alert-title</h3>').append($('<div class="bs-alertTitle">').append($('<input type="text" name="alertTitle">')));
		// alert-message
		rtn.append('<h3>alert-message</h3>').append($('<div class="bs-alertMessage">').append($('<input type="text" name="alertMessage">')));

		// alert-style
		var htmlBtnStyle = '		<li style="display:inline-block; vertical-align:bottom; margin-left:.7em;">			<alert>				<input type="radio" name="alertStyle" value="<%= styleVal %>" style="display:block;">				<span class="alert <%= styleVal %>" type="alert"><%= styleLbl %></span>			</alert>		</li>';
		// var htmlBtnStyle = (function() {/*
		// <li style="vertical-align:bottom;">
		// 	<label>
		// 		<input type="radio" name="alertStyle" value="<%= styleVal %>" style="display:block;">
		// 		<div class="alert <%= styleVal %>" role="alert"><%= styleLbl %>
		// 			<strong><%= exTitle %></strong><%= exMessage %>
		// 		</div>
		// 	</label>
		// </li>
		// */}).toString().uHereDoc();
		var _htmlBtnStyle = _.template(htmlBtnStyle);
		$ulBtnStyle = $('<ul>');
		for (var style_i = 0; style_i < _alertStyle.length; style_i++) {
			$ulBtnStyle.append($(_htmlBtnStyle({
				'styleVal'  : _alertStyle[style_i].value,
				'styleLbl'  : _alertStyle[style_i].alert,
				'exTitle'   : _alertStyle[style_i].ex_title,
				'exMessage' : _alertStyle[style_i].ex_message
			})));
		}
		rtn.append('<h3>alert-style</h3>').append($('<div class="bs-alertStyle">').append($ulBtnStyle));

		$(elm).html(rtn);

		// 描画後の処理
		$('input[name="alertTitle"]').val(data.fields['alert-title']);
		$('input[name="alertMessage"]').val(data.fields['alert-message']);

		// alertStyle
		_default_val = $('input[name="alertStyle"]').get(0).value;
		_checked_val = data.fields['alert-style'];
		if(_checked_val !== _default_val){
			$('input[name="alertStyle"][value="' + _checked_val +'"]').prop('checked', true);
		}else{
			$('input[name="alertStyle"][value="' + _default_val +'"]').prop('checked', true);
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
		data.fields['alert-title'] = $dom.find('input[name="alertTitle"]').val();
		data.fields['alert-message'] = $dom.find('input[name="alertMessage"]').val();
		data.fields['alert-style'] = $dom.find('input[name="alertStyle"]:checked').val();
		callback(data);
	}// this.saveEditorContent()
}
