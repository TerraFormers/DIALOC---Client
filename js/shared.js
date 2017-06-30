// $.ajaxSetup({
//   crossDomain: true,
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json; charset=utf-8'
//   }
// });


// const splitToken = localStorage.token.split('.')
// const id = JSON.parse(atob(splitToken[1])).id

if (localStorage.token){
  $('.login-btn').text('logout')
  $('.login-btn').click(()=>{
    delete localStorage.token
  })
}

if ($('img').attr('src', '')){
  $('img').attr('src', '../images/earth.jpeg')
}

var wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
var wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
var wmRegMapsKey = 'AIzaSyBWwNKenoShzQRdzvj8Ifobvl4fYzR4kXs'
var wmGeocodingKey = 'AIzaSyDwVSMTSddT1ABkgp8YwzsH7qcqKms2U18'
var rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'


function fetchGet(url) {
  const format = new Request(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  return makePostReq(format)
}

function fetchPost(url, req) {
  const format = new Request(url, {
    method: 'POST',
    body: JSON.stringify(req),
    mode: 'cors',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `${localStorage.token}`
    }
  })
  return makePostReq(format)
}

function makePostReq(req) {
  return fetch(req).then(confirmation)

  function confirmation(res) {
    return res.json().then((json) => {
      if (res.status != 200) {
        throw json
      } else {
        return json
      }
    })
  }
}

  function addFavSatImages(set) {
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
