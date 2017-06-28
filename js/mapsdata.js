var wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
var wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
var wmRegMapsKey = 'AIzaSyBWwNKenoShzQRdzvj8Ifobvl4fYzR4kXs'
var wmGeocodingKey = 'AIzaSyDwVSMTSddT1ABkgp8YwzsH7qcqKms2U18'
var rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'





$(() => {

  $('.modal-btn').click(() => {
    var src1 = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${originalLocation}&fov=90&heading=235&pitch=10&key=${wmStreetViewKey}`
    var src2 = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${antipodeLocation}&fov=90&heading=235&pitch=10&key=${wmStreetViewKey}`


    addSatImages()
    findIMGsize(src1, 'original')
    findIMGsize(src2, 'antipode')

    getLocData(originalLocation, $('.original-address'))
    getLocData(antipodeLocation, $('.antipode-address'))


    function findIMGsize(src, el) {
      return $.get(src).then((imgData) => {
        if (imgData.length > 6000) {
          return true
        } else {
          return false
        }
      }).then((hasImage) => {
        if (hasImage) {
          $(`.modal-streetview-${el}`).attr('src', src)
        } else {
          console.log('no streetview')
        }
      })
    }
  })
})



function addSatImages() {
  let twoPoints = [originalLocation, antipodeLocation];
  let maxZoom = 9;
  for (let i in twoPoints) {
    let e = {
      lat: twoPoints[i][0],
      lng: twoPoints[i][1]
    };
    let maxZoomService = new google.maps.MaxZoomService();
    maxZoomService.getMaxZoomAtLatLng(e, function(response) {
      maxZoom = response.zoom;
      $('.modal-img-sat')[i].src = `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${twoPoints[i].toString()}&zoom=${maxZoom}&size=350x350&key=${rpSatKey}`
    })
  }
}

function getLocData(coords, el) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.toString()}&key=${wmGeocodingKey}`
  $.get(url, (loc) => {
    return loc
  }).then((locData) => {
    let info = locData.results
    // console.log(info)
    return renderLocAddress(info)
  }).then((address) => {
    el.text(address)
  })


}

function renderLocAddress(info) {
  $('.original-coords').text(strPairCoords(originalLocation))
  $('.antipode-coords').text(strPairCoords(antipodeLocation))
  let addressString = ''
  if (info) {
    if (info.length > 0) {
      let addressInfo = []
      let addressComponents = info[0].address_components
      for (i in addressComponents) {
        addressInfo.push(addressComponents[i].long_name)
      }
      addressString = addressInfo.join(', ')
      return addressString
    } else {
      return ''
    }
  } else {
    return ''
  }
}
