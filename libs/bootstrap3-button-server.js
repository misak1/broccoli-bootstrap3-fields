module.exports = function(broccoli) {

  require('m-util');
  var log = require('m-log');
  var JSONPath = require('JSONPath');
  var json = require('json');
  var util = require('util');
  var _ = require('underscore');
  var fs = require('fs-extra');

  var it79 = require('iterate79');
  var php = require('phpjs');
  var _resMgr = broccoli.resourceMgr;
  var _this = this;
  var _button = '<button class="btn btn-default" type="button" onclick="(ダブルクリックしてテキストを編集してください)"><span style="color:#999;background-color:#ddd;font-size:10px;padding:0 1em;max-width:100%;overflow:hidden;white-space:nowrap;">(ダブルクリックしてHTMLコードを編集してください)</span></button>';


  // <Server Side> |  Client Side
  // --------------+-------------------
  // bind          |
  // mkPreviewHtml | mkPreviewHtml
  // normalizeData | normalizeData
  //               | mkEditor
  //               | duplicateData
  //               | saveEditorContent
  // gpi           |

  /**
   * データをバインドする
   */
  this.bind = function(fieldData, mode, mod, callback) {
    var rtn = {}
    if (typeof(fieldData) === typeof({})) {
      rtn = fieldData;
    }
    // console.log('mode', mode);
    it79.fnc({}, [
      function(it1, data) {
        console.log('rtn', rtn);
        _resMgr.getResource(rtn.resKey, function(res) {
          if(rtn.base64 == null) rtn.base64 = _button;
          if (mode == 'canvas') {
            rtn.html = rtn.base64;
          }
          it1.next(data);
          return;
        });
      },
      function(it1, data) {
        callback(rtn.html);
        it1.next();
      }
    ]);
    return;
  }

  /**
   * プレビュー用の簡易なHTMLを生成する
   */
  this.mkPreviewHtml = function(fieldData, mod, callback) {
    console.log('mkPreviewHtml', 'server');
    var rtn = {}
    if (typeof(fieldData) === typeof({})) {
      rtn = fieldData;
    }
    _resMgr.getResource(rtn.resKeyEditPng, function(res) {
      callback(rtn.get(0).outerHTML);
    });
    return;
  }

  /**
   * データを正規化する
   */
  this.normalizeData = function(fieldData, mode) {
    var rtn = fieldData;
    if (typeof(fieldData) !== typeof({})) {
      rtn = {
        "resKey":''
      };
    }
    return rtn;
  }

  /**
   * GPI (Server Side)
   */
  this.gpi = function(options, callback) {
    callback = callback || function() {};
    log.debug('options.api', options.api);
    log.debug('options', options);
    switch (options.api) {
      default:
        callback('ERROR: Unknown API');
        break;
    }

    return this;
  }

}
