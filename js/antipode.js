
$(() => {
  // $.ajaxSetup({
  //   crossDomain: true,
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json; charset=utf-8',
  //     // 'Authorization': `${localStorage.token}`
  //   }
  // });
  var wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
  var wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
  var wmRegMapsKey = 'AIzaSyBWwNKenoShzQRdzvj8Ifobvl4fYzR4kXs'
  var wmGeocodingKey = 'AIzaSyDwVSMTSddT1ABkgp8YwzsH7qcqKms2U18'
  var rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'
  let currentURL = window.location.href;
  // let id = currentURL.slice(currentURL.indexOf("=") + 1)





  initialize()
  $('#btn-latlong').click(function() {
    const validLatLong = new RegExp(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
    let input = $('#input-latlong').val()
    // console.log(input)
    if(input.match(validLatLong)){
      const latlong = input.split(',')
      const lat = parseFloat(latlong[0])
      const long = parseFloat(latlong[1])
      center = [lat, long]
    }else{

    }
    // const latlong = input.split(',')
    // const lat = parseFloat(latlong[0])
    // const long = parseFloat(latlong[1])
    // center = [lat, long]
    earth1.setView(center)
    update()
  })
  $('.add-fav-btn').click((e)=>{
    
      let splitToken = localStorage.token.split('.')
      let id = JSON.parse(atob(splitToken[1])).id

    e.preventDefault()
    let coords = $("#current-location").text().split(', ')
    let req = {
      "latitude": coords[0],
      "longitude": coords[1],
      "user_id": id
    }
    console.log(req)

    // $.post(`https://dialoc-server.herokuapp.com/user/${id}/location`, req).then((res)=>{
    //   // window.location.reload
    //   console.log(res)
    // }).catch((err)=>{console.log(err);})

    fetchPost(`https://dialoc-server.herokuapp.com/user/${id}/location`, req)
          .then(result => {
            // window.location.reload
            console.log(req)})
            .catch(error => {
            console.log(error)
          })
  })

})

let earth1
let earth2
let zoom = 2
let center = [39.7578, -105.0072]
let comparison = []
let antip = antipode(center)
var originalLocation;
var antipodeLocation;
// const validLatLong = new RegExp('^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*[-+]?(180(\.0+)?|((‌​1[0-7]\d)|([1-9]?\d)‌​)(\.\d+)?)$')

function antipode(coord) {
  return [-1 * coord[0], coord[1] - 180]
}

function update() {
  if (center[0] == earth1.getCenter()[0] && center[1] == earth1.getCenter()[1]) {
    center = antipode(earth2.getCenter())
    earth1.setView([center[0], center[1]])
  } else {
    center = earth1.getCenter()
    antip = antipode(center)
    earth2.setView([antip[0], antip[1]])
  }
  if (earth1.getZoom() != zoom) {
    zoom = earth1.getZoom()
    earth2.setZoom(zoom)
  } else {
    zoom = earth2.getZoom()
    earth1.setZoom(zoom)
  }

}

function initialize() {
  actionHandler('click')
  actionHandler('wheel')
  const proxyUrl = 'https://data.webglearth.com/cgi-bin/corsproxy.fcgi?url='
  earth1 = new WebGLEarth('earth_div1', {
    zoom: zoom,
    center: center,
    proxyHost: proxyUrl
  })
  earth2 = new WebGLEarth('earth_div2', {
    zoom: zoom,
    center: antipode(center),
    proxyHost: proxyUrl
  })
  setInterval('update()', 50)
  earth1.setZoom(1)


}

function actionHandler(action) {
  let timer
  $('main').on(`${action}`, function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {

      return logAntipodes(center, antip)

    }, 50)
  })
}

function logAntipodes(a, b) {
  if ([a, b] != comparison) {
    originalLocation = numPairCoords(a)
    antipodeLocation = numPairCoords(realGeoAntipode(b))
    // console.log([originalLocation, antipodeLocation])
    $('#current-location').text(strPairCoords(originalLocation))
    $('.modal-loc-a h6').text(strPairCoords(originalLocation))
    $('.modal-loc-b h6').text(strPairCoords(antipodeLocation))
  }
  comparison = [a, b]
}

function realGeoAntipode(antip) {
  if (antip[1] < 0) {
    antip[1] += 360
  }
  return antip
}

function numPairCoords(arr) {
  return arr.map((a) => {
    return parseFloat(a.toFixed(6))
  })
}

function strPairCoords(arr) {
  return arr.map((a) => {
    return ` ${a}`
  }).join(',')
}
