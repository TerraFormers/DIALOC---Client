$(() => {
  initialize()

  function initialize() {
    const earth = new WE.map('earth_div_markers')
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth)

    function antipode(coord) {
      return [-1 * coord[0], coord[1] - 180]
    }
    let coords = [39.7578, -105.0072]
    let antip = antipode(coords)

    var markerCustom = WE.marker(coords, '/images/bullet_orange.png', 8,8).addTo(earth)
    var markerCustom2 = WE.marker(antip, '/images/bullet_orange.png', 8,8).addTo(earth)

    earth.setView([39.7578, -105.0072], .8);
  }
})
