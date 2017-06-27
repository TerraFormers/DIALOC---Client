$(() => {
  initialize()
  $('#btn-latlong').click(function() {
    // e.preventDefault()
    let latlong = $('#input-latlong').val().split(',')
    let lat = parseFloat(latlong[0])
    let long = parseFloat(latlong[1])
    center = [lat, long]
    earth1.setView(center)
    update()
  })
})

let earth1
let earth2
let zoom = 2
let center = [45.0, 6.0]
let comparison = []
let antip = antipode(center)
var originalLocation;
var antipodeLocation;
const validLatLong = new RegExp('^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*[-+]?(180(\.0+)?|((‌​1[0-7]\d)|([1-9]?\d)‌​)(\.\d+)?)$')

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
    console.log([originalLocation, antipodeLocation])
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
    return parseFloat(a.toFixed(4))
  })
}

function strPairCoords(arr) {
  return arr.map((a) => {
    return ` ${a}`
  }).join(',')
}
