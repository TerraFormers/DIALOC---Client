$(() => {
  initialize()

  let currentURL = window.location.href;
  let id = currentURL.slice(currentURL.indexOf("=") + 1);

  function antipode(coord) {
    return [-1 * coord[0], coord[1] - 180]
  }

  function initialize() {
    const earth = new WE.map('earth_div_markers')
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth)

    let coords = [39.7578, -105.0072]
    let antip = antipode(coords)

    var markerCustom = WE.marker(coords, '/images/bullet_orange.png', 8, 8).addTo(earth)
    var markerCustom2 = WE.marker(antip, '/images/bullet_orange.png', 8, 8).addTo(earth)

    earth.setView([39.7578, -105.0072], .8);
  }

  $.get(`https://dialocserver-api.herokuapp.com/users/${id}/antipodes`)
    .then((res) => addFavoriteImage([
      [res[0].latitude, res[0].longitude],
      antipode([res[0].latitude, res[0].longitude])
    ])).then(() => addFavoriteImage([
      [39.7578, -105.0072],
      [-44.7584, 192.1819]
    ]));

  function addFavoriteImage(homeCoords, hero = "col s5 amber lighten-5") {
    let imgURL = [];
    let maxZoom = 9;

    for (let i = 0; i < 2; i++) {
      let e = {
        lat: homeCoords[i][0],
        lng: homeCoords[i][1]
      };

      let maxZoomService = new google.maps.MaxZoomService();
      maxZoomService.getMaxZoomAtLatLng(e, function(response) {
        maxZoom = response.zoom;
        imgURL.push(`https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${homeCoords[i].toString()}&zoom=${maxZoom}&size=350x350&key=AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk`);

        if (i == 1) {
          $("#favImage").append(`
            <a href="#modal1" class="roundedBorder lessImage ${hero} card-panel valign-wrapper activator">
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
    $('.modal').modal();
  }
  $(".col").on("click", function() {
    console.log(this);
    $("#modalBody").html("");
    $("#modalBody").html(`Enter Info Here`);
  });
});
