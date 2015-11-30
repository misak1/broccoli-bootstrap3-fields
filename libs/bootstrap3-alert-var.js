module.exports = new(function() {
  _alertTitle = "Well done!";
  _alertMessage = "You successfully read this important alert message.";
	_alertStyle = [
		{"value":" alert-success", "label":"success", "ex_title": "Well done!", "ex_message": "You successfully read this important alert message."},
		{"value":" alert-info"   , "label":"info"   , "ex_title": "Heads up!" , "ex_message": "This alert needs your attention, but it's not super important."},
		{"value":" alert-warning", "label":"warning", "ex_title": "Warning!"  , "ex_message": "Better check yourself, you're not looking too good."},
		{"value":" alert-danger" , "label":"danger" , "ex_title": "Oh snap!"  , "ex_message": "Change a few things up and try submitting again."}
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
