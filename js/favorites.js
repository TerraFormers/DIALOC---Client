$(() => {
  let maxZoom = 9;
  let maxZoomService = new google.maps.MaxZoomService();

  initialize()

  function initialize() {
    const earth = new WE.map('earth_div_markers_all')
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth)

    function antipode(coord) {
      return [-1 * coord[0], coord[1] - 180]
    }
    let coords = [39.7578, -105.0072]
    let antip = antipode(coords)

    var markerCustom = WE.marker(coords, '/images/bullet_orange.png', 8, 8).addTo(earth)
    var markerCustom2 = WE.marker(antip, '/images/bullet_pink.png', 8, 8).addTo(earth)

    earth.setView([39.7578, -105.0072], .8);
    addFavorites([
      [
        [39.7578, -105.0072],
        [-44.7584, 192.2543]
      ],
      [
        [50.7578, -105.0072],
        [-50.7584, 192.1819]
      ],
      [
        [70.7578, -115.0072],
        [-30.7584, 200.1764]
      ],
      [
        [70.7578, -115.0072],
        [-30.7584, 200.1237]
      ]
    ])
  }



  var count = 0;
  let hero = "col s12 amber lighten-1 hero";

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



  function addFavorites(favorites) {
    for (let i in favorites) {
      addFavSatImages(favorites[i]).then((urls) => {
        let coords = favorites[i]
        if (i == 0) {
          urls.forEach((url) => {
            $('.hero-container').append(`
              <div class="hero-img-container">
                <img src="${url}" alt="" class="circle responsive-img favorite-img hero-img">
                <p class="red-text white roundedBorder">${coords.join(', ')}</p>
              </div>`)
          })
        } else {
          let favsContainer = $('<div class=" lesser-fav container roundedBorder "></div>')
          $('.favs-container').append(favsContainer)
          urls.forEach((url) => {
            favsContainer.append(`<div class="lesser-img-container">
              <img src="${url}" alt="" class="circle responsive-img favorite-img hero-img">
              <p class="red-text white roundedBorder">${coords.join(', ')}</p>
            </div>`)
          })
        }
      })

    }

    function addFavSatImages(set) {
      console.log(set)
      return Promise.all([
        getSatURL(set[0]),
        getSatURL(set[1])
      ])
    }

    function getSatURL(location) {
      return new Promise((resolve, reject) => {
        let e = {
          lat: location[0],
          lng: location[1]
        };
        maxZoomService.getMaxZoomAtLatLng(e, function(response) {
          maxZoom = response.zoom;
          let url = `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${location.toString()}&zoom=${maxZoom}&size=350x350&key=${rpSatKey}`
          resolve(url)
        })
      })
    }




  }


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
            <a id="${count}" href="#modal1" class="roundedBorder lessImage ${hero} card-panel valign-wrapper activator">
                <div class="col s6">
                  <img src="${imgURL[0]}" alt="" class="circle responsive-img favorite-img">
                  <p class="red-text white roundedBorder">${homeCoords[0]}</p>
                </div>
                <div class="col s6">
                  <img src="${imgURL[1]}" alt="" class="circle responsive-img favorite-img">
                  <p class="red-text white roundedBorder">${homeCoords[1]}</p>
                </div>
                <div class="col s12 white red-text roundedBorder"><span class="right"><a> <i class="material-icons white-text">thumb_up</i></a></span></div>

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
  //
  // addFavoriteImage([
  //   [39.7578, -105.0072],
  //   [-44.7584, 192.2543]
  // ], hero)
  // addFavoriteImage([
  //   [50.7578, -105.0072],
  //   [-50.7584, 192.1819]
  // ])
  // addFavoriteImage([
  //   [70.7578, -115.0072],
  //   [-30.7584, 200.1764]
  // ])
  // for (var i = 0; i < 11; i++) {
  //
  //   addFavoriteImage([
  //     [70.7578, -115.0072],
  //     [-30.7584, 200.1237]
  //   ]);
  // }

  // $("body").scroll(console.log(isScrolledIntoView($(".lessImage"))));
  // setTimeout(function() {
  //   console.log(isScrolledIntoView($(".lessImage")));
  // }, 2000)
});
