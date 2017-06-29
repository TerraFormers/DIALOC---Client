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

    $('.hero').click((e)=>{
      e.stopPropagation()
      // $('#modal2').modal('open')
      console.log(e.target)
    })
    $('.lesser-fav').click((e)=>{
      e.stopPropagation()
      // $('#modal2').modal('open')
      console.log(e.target)
    })

    $('.rating').click((e)=>{
      e.stopPropagation()
      console.log(e.target)

    })
  }



  // $.get(`https://dialocserver-api.herokuapp.com/users/${id}/antipodes`)
  //   .then((res) => addFavoriteImage([
  //     [res[0].latitude, res[0].longitude],
  //     antipode([res[0].latitude, res[0].longitude])
  //   ])).then(() => addFavoriteImage([
  //     [50.7578, 105.0072],
  //     [-44.7584, 192.1819]
  //   ])).then(() => initialize(
  //     [
  //       [39.7578, 105.0072],
  //       [39.7578, -105.0072]
  //     ]));

  function addFavorites(favorites) {
    for (let i in favorites) {
      addFavSatImages(favorites[i]).then((urls) => {
        let coords = favorites[i]
        if (i == 0) {
          let heroContainer = $('<div class="hero-container"></div>')
          $('.hero-container-master').prepend(heroContainer)
          for(let i in urls) {
            $('.hero-container').append(`
              <div class="hero-img-container">
                <img src="${urls[i]}" alt="" class="circle responsive-img favorite-img hero-img">
                <p class="white roundedBorder font-source" style="border: 1px solid red;">${coords[i].join(', ')}</p>
              </div>`)
          }
          // $('.hero-container-master').append($(`<div class="roundedBorder white font-source">user</div>`))
        } else {
          let contain = $('<div class="col s6" ></div>')
          let favsContainer = $(`<div class="lesser-fav roundedBorder "><div class="white center  rating"><span class="center"><h5 class="upvote-count font-source">10</h5><a class="upvote-btn lesser-upvote-btn"><i class="material-icons small center black-text thumb">thumb_up</i></a></span></div></div></div>`)
          let actualContainer = $(`<div class ="lesser-actual-contain"> `)
          $('.lesser-favs-master').append(contain.append(favsContainer.prepend(actualContainer)))
            for(let j in urls) {
            actualContainer.append($(`<div class="lesser-img-container">
              <img src="${urls[j]}" alt="" class="circle responsive-img favorite-img hero-img">
              <p class="font-source">${coords[j].join(', ')}</p>
            </div>`))
          }
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
})

// function isScrolledIntoView(allEl) {
//   for (let el of allEl) {
//     var elemTop = el.getBoundingClientRect().top;
//     var elemBottom = el.getBoundingClientRect().bottom;
//     var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
//     if (isVisible) {
//       console.log(el);
//     }
//   }
// }
