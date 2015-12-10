module.exports = function(broccoli){

	require('m-util');
	var it79 = require('iterate79');
	var php = require('phpjs');
	var resouce = require('br-resouce');
	var mLog = require('m-log');
	var _ = require('underscore');
	require('./bootstrap3-button-var.js');
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
					"btn-label": _btnLabel,
					"btn-action": _btnAction,
					"btn-type": _btnType[0].value,
					"btn-style" :_btnStyle[0].value,
					"btn-size": _btnSize[0].value,
					"btn-block": _btnBlock[0].value
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
		// btn-label
		rtn.append('<h3>btn-label</h3>').append($('<div class="bs-btnLabel">').append($('<input type="text" name="btnLabel">')));

		// btn-action
		rtn.append('<h3>btn-action</h3>').append($('<div class="bs-btnAction">').append($('<textarea name="btnAction">')));

		// btn-type
		var htmlBtnType = '		<li style="list-style:none;">			<label style="display:block;">				<input type="radio" name="btnType" value="<%= typeVal %>" style="display:block;">				<span><%= typeLbl %></span>			</label>		</li>';
		// var htmlBtnType = (function() {/*
		// <li style="list-style:none;">
		// 	<label style="display:block;">
		// 		<input type="radio" name="btnType" value="<%= typeVal %>" style="display:block;">
		// 		<span><%= typeLbl %></span>
		// 	</label>
		// </li>
		// */}).toString().uHereDoc();
		var _htmlBtnType = _.template(htmlBtnType);
		$ulBtnType = $('<ul>');
		for (var type_i = 0; type_i < _btnType.length; type_i++) {
			$ulBtnType.append($(_htmlBtnType({
				'typeVal': _btnType[type_i].value,
				'typeLbl': _btnType[type_i].label
			})));
		}
		rtn.append('<h3>btn-type</h3>').append($('<div class="bs-btnType">').append($ulBtnType));


		// btn-style
		var htmlBtnStyle = '		<li style="display:inline-block; vertical-align:bottom; margin-left:.7em;">			<label>				<input type="radio" name="btnStyle" value="<%= styleVal %>" style="display:block;">				<span class="btn <%= styleVal %>" type="button"><%= styleLbl %></span>			</label>		</li>';
		// var htmlBtnStyle = (function() {/*
		// <li style="display:inline-block; vertical-align:bottom; margin-left:.7em;">
		// 	<label>
		// 		<input type="radio" name="btnStyle" value="<%= styleVal %>" style="display:block;">
		// 		<span class="btn <%= styleVal %>" type="button"><%= styleLbl %></span>
		// 	</label>
		// </li>
		// */}).toString().uHereDoc();
		var _htmlBtnStyle = _.template(htmlBtnStyle);
		$ulBtnStyle = $('<ul>');
		for (var style_i = 0; style_i < _btnStyle.length; style_i++) {
			$ulBtnStyle.append($(_htmlBtnStyle({
				'styleVal': _btnStyle[style_i].value,
				'styleLbl': _btnStyle[style_i].label
			})));
		}
		rtn.append('<h3>btn-style</h3>').append($('<div class="bs-btnStyle">').append($ulBtnStyle));


		// btn-size
		var htmlBtnSize = (function() {/*
		<li style="display:inline-block; vertical-align:bottom; margin-left:.7em;">
			<label>
				<input type="radio" name="btnSize" value="<%= sizeVal %>" size="display:block;">
				<span class="btn btn-default <%= sizeVal %>" type="button"><%= sizeLbl %></span>
			</label>
		</li>
		*/}).toString().uHereDoc();
		var _htmlBtnSize = _.template(htmlBtnSize);
		$ulBtnSize = $('<ul>');
		for (var size_i = 0; size_i < _btnSize.length; size_i++) {
			$ulBtnSize.append($(_htmlBtnSize({
				'sizeVal': _btnSize[size_i].value,
				'sizeLbl': _btnSize[size_i].label
			})));
		}
		rtn.append('<h3>btn-size</h3>').append($('<div class="bs-btnSize">').append($ulBtnSize));

		// btn-Block
		var htmlBtnBlock = (function() {/*
		<li style="list-style:none;">
			<label style="display:block;">
				<input type="radio" name="btnBlock" value="<%= blockVal %>" block="display:block;">
				<span class="btn btn-default <%= blockVal %>" type="button"><%= blockLbl %></span>
			</label>
		</li>
		*/}).toString().uHereDoc();
		var _htmlBtnBlock = _.template(htmlBtnBlock);
		$ulBtnBlock = $('<ul>');
		for (var block_i = 0; block_i < _btnBlock.length; block_i++) {
			$ulBtnBlock.append($(_htmlBtnBlock({
				'blockVal': _btnBlock[block_i].value,
				'blockLbl': _btnBlock[block_i].label
			})));
		}
		rtn.append('<h3>btn-block</h3>').append($('<div class="bs-btnBlock">').append($ulBtnBlock));

		$(elm).html(rtn);

		// 描画後の処理
		$('input[name="btnLabel"]').val(data.fields['btn-label']);
		$('textarea[name="btnAction"]').val(data.fields['btn-action']);
		var _default_val = $('input[name="btnType"]').get(0).value;
		var _checked_val = data.fields['btn-type'];
		if(_checked_val !== _default_val){
			$('input[name="btnType"][value="' + _checked_val +'"]').prop('checked', true);
		}else{
			$('input[name="btnType"][value="' + _default_val +'"]').prop('checked', true);
		}
		// btnStyle
		_default_val = $('input[name="btnStyle"]').get(0).value;
		_checked_val = data.fields['btn-style'];
		if(_checked_val !== _default_val){
			$('input[name="btnStyle"][value="' + _checked_val +'"]').prop('checked', true);
		}else{
			$('input[name="btnStyle"][value="' + _default_val +'"]').prop('checked', true);
		}
		// btnSize
		_default_val = $('input[name="btnSize"]').get(0).value;
		_checked_val = data.fields['btn-size'];
		if(_checked_val !== _default_val){
			$('input[name="btnSize"][value="' + _checked_val +'"]').prop('checked', true);
		}else{
			$('input[name="btnSize"][value="' + _default_val +'"]').prop('checked', true);
		}
		// btnBlock
		_default_val = $('input[name="btnBlock"]').get(0).value;
		_checked_val = data.fields['btn-block'];
		if(_checked_val !== _default_val){
			$('input[name="btnBlock"][value="' + _checked_val +'"]').prop('checked', true);
		}else{
			$('input[name="btnBlock"][value="' + _default_val +'"]').prop('checked', true);
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
		data.fields['btn-label'] = $dom.find('input[name="btnLabel"]').val();
		data.fields['btn-action'] = $dom.find('textarea[name="btnAction"]').val();
		data.fields['btn-type'] = $dom.find('input[name="btnType"]:checked').val();
		data.fields['btn-style'] = $dom.find('input[name="btnStyle"]:checked').val();
		data.fields['btn-size'] = $dom.find('input[name="btnSize"]:checked').val();
		data.fields['btn-block'] = $dom.find('input[name="btnBlock"]:checked').val();
		callback(data);
	}// this.saveEditorContent()
}
