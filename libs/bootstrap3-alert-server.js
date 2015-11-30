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
  var _button = '<button class="alert alert-default" type="button" onclick="(ダブルクリックしてテキストを編集してください)"><span style="color:#999;background-color:#ddd;font-size:10px;padding:0 1em;max-width:100%;overflow:hidden;white-space:nowrap;">(ダブルクリックしてHTMLコードを編集してください)</span></button>';
  require('./bootstrap3-alert-var.js');

  /**
   * データをバインドする
   */
  this.bind = function(fieldData, mode, mod, callback) {
    var rtn = {}
    if (typeof(fieldData) === typeof({})) {
      rtn = fieldData;
    }
    it79.fnc({}, [
      function(it1, data) {
        console.log('rtn', rtn);
        _resMgr.getResource(rtn.resKey, function(res) {
          if(rtn.html == null) rtn.html = _button;
          if (mode == 'canvas'){
            var htmlBtn = '<div class="alert <%= alertClass %>" role="alert"><strong><%= alertTitle %></strong><%= alertMessage %></div>';
            var _htmlBtn = _.template(htmlBtn);
            var html = _htmlBtn({
                'alertClass': rtn.fields['alert-style'],
                'alertTitle':rtn.fields['alert-title'],
                'alertMessage':rtn.fields['alert-message']
              });
            rtn.html = html
            console.log(html);
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
