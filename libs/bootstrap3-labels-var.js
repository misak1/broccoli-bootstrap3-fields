module.exports = new(function() {
  _labelLabel = "New";
	_labelStyle = [
		{"value":" label-default", "label":"default"},
		{"value":" label-primary", "label":"primary"},
		{"value":" label-success", "label":"success"},
		{"value":" label-info", "label":"info"},
		{"value":" label-warning", "label":"warning"},
		{"value":" label-danger", "label":"danger"},
		{"value":" label-link", "label":"link"}
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
