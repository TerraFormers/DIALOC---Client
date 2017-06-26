$(() => {
  initialize()
  $('#btn-latlong').click(function() {
    // e.preventDefault()
    let latlong = $('#input-latlong').val().split(',')
    let lat = parseFloat(latlong[0])
    let long = parseFloat(latlong[1])
    center = [lat, long]
    earth1.setView(center)
    console.log(center)
    console.log(realGeoAntipode(antip))
    update()
  })
})

let earth1
let earth2
let zoom = 2
let center = [45.0, 6.0]
let comparison = []
let antip = antipode(center)
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
  earth1.setZoom(2.05)
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
    console.log(a, realGeoAntipode(b))
  }
  comparison = [a, b]
  console.log()
  let formatLocation = ` ${a[0].toFixed(4)}, ${a[1].toFixed(4)}`
  $('#current-location').text(formatLocation)
  console.log(zoom)
}

function realGeoAntipode(antip) {
  if (antip[1] < 0) {
    antip[1] += 360
  }
  return antip
}
