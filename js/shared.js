$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});


var wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
var wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
var wmRegMapsKey = 'AIzaSyBWwNKenoShzQRdzvj8Ifobvl4fYzR4kXs'
var wmGeocodingKey = 'AIzaSyDwVSMTSddT1ABkgp8YwzsH7qcqKms2U18'
var rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'




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
      let maxZoom = 9;
      let e = {
        lat: location[0],
        lng: location[1]
      };
      let maxZoomService = new google.maps.MaxZoomService();
      maxZoomService.getMaxZoomAtLatLng(e, function(response) {
        maxZoom = response.zoom;
        let url = `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${location.toString()}&zoom=${maxZoom}&size=350x350&key=${rpSatKey}`
        resolve(url)
      })
    })
  }
}
