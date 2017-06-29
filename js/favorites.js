$(() => {
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


})
