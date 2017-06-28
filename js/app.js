$(() => {
  $(".button-collapse").sideNav();

  $(document).ready(function() {
    $('.tooltipped').tooltip({
      delay: 50
    });
  });

  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.

    },
    complete: function(){
      $('.original-title').html()
    }

  });

  $('.tap-target').tapTarget('open');






  // menuHover('about', 'info_outline')
  // menuHover('favorites', 'star')
  // menuHover('account', 'account_circle')


  function menuHover(item, icon) {
    $(`.${item}`).mouseenter(() => {
      $(`.${item}`).html(`<i class = "large material-icons"> ${icon} </i>`)
    })
    $(`.${item}`).mouseleave(() => {
      $(`.${item}`).html(`${item}`)
    })
  }





})









// $( () => {
//   console.log("Document is loaded");
//   start();
// });
//
// //  the staring point of the app
// function start() {
//   addListeners();
//   log("You can always log here...");
//   // DomManager.createContainer(document.body);
// }//
//
// // a one single function that holds multiple listeners, to be called once
// function addListeners() {
//   document.addEventListener(CLICK, onClick);
//   document.addEventListener(KEY_PRESS, onKeyPress);
//   document.addEventListener(KEY_UP, onKeyUp);
// }
//
// // if the user clicked at any point on the document
// function onClick(event) {
//   console.log("Clicked");
// }
//
// // when the user press any key on the keyboard
// function onKeyPress(event) {
//   console.log("Key pressed", event.keyCode);
// }
//
// // when any key was released
// function onKeyUp(event) {
//   console.log("Key up", event.keyCode);
// }
//
// // a quick message logger
// function log(msg) {
//   DomManager.getDomByID("log").innerHTML = msg;
// }
