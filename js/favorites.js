$(() => {

  const wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
  const wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
  const wmRegMapsKey = 'AIzaSyBWwNKenoShzQRdzvj8Ifobvl4fYzR4kXs'
  const wmGeocodingKey = 'AIzaSyDwVSMTSddT1ABkgp8YwzsH7qcqKms2U18'
  const rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'

  const earth = new WE.map('earth_div_markers_all')
  WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth)
  earth.setView([39.7578, -105.0072], .8);

  $.ajaxSetup({
    crossDomain: true,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `${localStorage.token}`
    }
  });

  $('.hero').click((e) => {
    e.stopPropagation()
    // $('#modal2').modal('open')
    console.log(e.target)
  })
  $('.lesser-fav').click((e) => {
    e.stopPropagation()
    // $('#modal2').modal('open')
    console.log(e.target)
  })

  $('.rating').click((e) => {
    e.stopPropagation()
    console.log(e.target)

  })

  // initialize()

  $.get('https://dialoc-server.herokuapp.com/location').then((res) => {
    return res
  }).then((data) => {
    function antipode(coord) {
      let mapAntip = [-1 * coord[0], coord[1] - 180]
      return mapAntip
    }
    console.log(data)
    let inputCoords = []
    for (let i of data) {
      inputCoords.push([i.latitude, i.longitude])
    }
    let bothCoords = inputCoords.map((set) => {
      return [set, antipode(set))]
    })
    console.log(bothCoords)
    return bothCoords
  }).then((array) => {
    console.log(array)
    setMarkers(array)
    addFavorites(array)
  })

  function setMarkers(coords) {
    console.log('wow');


    return coords.forEach((coord)=>{
      console.log(coord)
      let markerCustom = WE.marker(coord[0], '/images/bullet_orange.png', 8, 8).addTo(earth)
      let markerCustom2 = WE.marker(coord[1], '/images/bullet_pink.png', 8, 8).addTo(earth)
    })
  }

  function addFavorites(favorites) {
    console.log('ok')
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
  }

})
