$(() => {
  var count = 0;
  let hero = "col s12 amber lighten-1";

  function isScrolledIntoView(allEl) {
    for (let el of allEl) {
      var elemTop = el.getBoundingClientRect().top;
      var elemBottom = el.getBoundingClientRect().bottom;

      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      if (isVisible) {
        console.log(el);
      }
    }
  }

  function addFavoriteImage(homeCoords, hero = "col s5 amber lighten-5") {
    let imgURL = [];
    let maxZoom = 9;

    for (let i = 0; i < 2; i++) {
      let e = {lat: homeCoords[i][0], lng: homeCoords[i][1]};

      let infoWindow = new google.maps.InfoWindow();
      let maxZoomService = new google.maps.MaxZoomService();
      maxZoomService.getMaxZoomAtLatLng(e, function(response) {
        maxZoom = response.zoom;
        imgURL.push(`https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${homeCoords[i].toString()}&zoom=${maxZoom}&size=350x350&key=AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk`);

        if (i == 1) {
          $("#favImage").append(`
            <a id="${count}" href="#modal1" class="roundedBorder lessImage ${hero} card-panel valign-wrapper activator">
                <div class="col s6">
                  <img src="${imgURL[0]}" alt="" class="circle responsive-img favorite-img">
                  <p class="red-text">${homeCoords[0]}</p>
                </div>
                <div class="col s6">
                  <img src="${imgURL[1]}" alt="" class="circle responsive-img favorite-img">
                  <p class="red-text">${homeCoords[1]}</p>
                </div>
              </a>`);
          }
      });
    }
    count++;


    $('.modal').modal();
    $(".activator").on("click", function() {
      console.log(this);
      $("#modalBody").html("");
      $("#modalBody").html(`Enter Info Here`);
    });
  }

  addFavoriteImage([
    [39.7578, -105.0072],
    [-44.7584, 192.1819]
  ], hero)
  addFavoriteImage([
    [50.7578, -105.0072],
    [-50.7584, 192.1819]
  ])
  addFavoriteImage([
    [70.7578, -115.0072],
    [-30.7584, 200.1819]
  ])
  for (var i = 0; i < 11; i++) {

    addFavoriteImage([
      [70.7578, -115.0072],
      [-30.7584, 200.1819]
    ]);
  }

  // $("body").scroll(console.log(isScrolledIntoView($(".lessImage"))));
  // setTimeout(function() {
  //   console.log(isScrolledIntoView($(".lessImage")));
  // }, 2000)
});
