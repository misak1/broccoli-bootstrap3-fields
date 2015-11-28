module.exports = new(function() {
  _btnLabel = "ボタンテキスト";
	_btnAction = "";
	_btnType = [
		{"value":"button", "label":"&lt;button type=&quot;button&quot;&gt;text&lt;/button&gt;"},
		{"value":"submit", "label":"&lt;button type=&quot;submit&quot;&gt;text&lt;/button&gt;"},
		{"value":"link", "label":"&lt;a href=&quot;url&quot;&gt;text&lt;/a&gt;"}
	];
	_btnStyle = [
		{"value":" btn-default", "label":"default"},
		{"value":" btn-primary", "label":"primary"},
		{"value":" btn-success", "label":"success"},
		{"value":" btn-info", "label":"info"},
		{"value":" btn-warning", "label":"warning"},
		{"value":" btn-danger", "label":"danger"},
		{"value":" btn-link", "label":"link"}
	];
	_btnSize = [
		{"value":"", "label":"default"},
		{"value":" btn-lg", "label":"Large"},
		{"value":" btn-sm", "label":"Small"},
		{"value":" btn-xs", "label":"X-Small"}
	];
	_btnBlock = [
		{"value":"", "label":"default(inline)"},
		{"value":" btn-block", "label":"block"}
	];

  // valueの対になるlabelを返す
  searchLabel = function(objects, strValue){
    for(var i=0; i<objects.length; i++) {
      if(objects[i].value === strValue) {
        return objects[i].label;
        break;
      }
    }
  }
  // labelの対になるvalueを返す
  searchValue = function(objects, strLabel){
    for(var i=0; i<objects.length; i++) {
      if(objects[i].label === strLabel) {
        return objects[i].value;
        break;
      }
    }
  }
})();
