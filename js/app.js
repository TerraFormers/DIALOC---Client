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
