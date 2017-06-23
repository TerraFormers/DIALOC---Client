$( () => {
  console.log("Document is loaded");
  start();
});

//  the staring point of the app
function start() {
  addListeners();
  log("You can always log here...");
  // DomManager.createContainer(document.body);
}//

// a one single function that holds multiple listeners, to be called once
function addListeners() {
  document.addEventListener(CLICK, onClick);
  document.addEventListener(KEY_PRESS, onKeyPress);
  document.addEventListener(KEY_UP, onKeyUp);
}

// if the user clicked at any point on the document
function onClick(event) {
  console.log("Clicked");
}

// when the user press any key on the keyboard
function onKeyPress(event) {
  console.log("Key pressed", event.keyCode);
}

// when any key was released
function onKeyUp(event) {
  console.log("Key up", event.keyCode);
}

// a quick message logger
function log(msg) {
  DomManager.getDomByID("log").innerHTML = msg;
}
