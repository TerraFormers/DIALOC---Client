var DomManager = {

  getDomByID : function (id) {
    return document.getElementById(id);
  },

  getDomByClass : function (className) {
    return document.getElementsByClassName(className);
  },

  createContainer : function (_parent = document.body, _width = "400px", _height = "400px", _background = "#444444", _color = "#EEEEEE") {
    var element = document.createElement("div");
    element.style.width = _width;
    element.style.height = _height;
    element.style.backgroundColor = _background;
    element.style.color = _color;
    _parent.append(element);
    return element;
  }

}
