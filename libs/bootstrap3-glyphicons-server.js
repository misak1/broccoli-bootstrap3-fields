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
  var _icon = "asterisk"; // ダミー


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
    console.log('mode', mode);
    var rtn = {}
    if (typeof(fieldData) === typeof({})) {
      rtn = fieldData;
    }
    // console.log('mode', mode);
    it79.fnc({}, [
      function(it1, data) {
        console.log('rtn', rtn);
        _resMgr.getResource(rtn.resKey, function(res) {
          if(rtn.icon === '' || rtn.icon == null){
            rtn.icon = _icon;
          }
          if (mode == 'canvas') {
            rtn.html = '<span class="glyphicon glyphicon-' + rtn.icon + '"></span>';
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
