$(() => {
  $.ajaxSetup({
    crossDomain: true,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
      // 'Authorization': `${localStorage.token}`
    }
  });
  // initialize()
  var wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
  var wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
  var wmRegMapsKey = 'AIzaSyBWwNKenoShzQRdzvj8Ifobvl4fYzR4kXs'
  var wmGeocodingKey = 'AIzaSyDwVSMTSddT1ABkgp8YwzsH7qcqKms2U18'
  var rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'

  function initialize(coords) {
    const earth = new WE.map('earth_div_markers_all')
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth)

    for (let coord of coords) {
      let antip = antipode(coord)

      var markerCustom = WE.marker(coord, '/images/bullet_orange.png', 8, 8).addTo(earth)
      var markerCustom2 = WE.marker(antip, '/images/bullet_pink.png', 8, 8).addTo(earth)
    }

    // function antipode(coord) {
    //   return [-1 * coord[0], coord[1] - 180]
    // }
    // let coords = [39.7578, -105.0072]
    // let antip = antipode(coords)
    // var markerCustom = WE.marker(coords, '/images/bullet_orange.png', 8, 8).addTo(earth)
    // var markerCustom2 = WE.marker(antip, '/images/bullet_pink.png', 8, 8).addTo(earth)

    earth.setView([39.7578, -105.0072], .8);
    // addFavorites([
    //   [
    //     [39.7578, -105.0072],
    //     [-44.7584, 192.2543]
    //   ],
    //   [
    //     [50.7578, -105.0072],
    //     [-50.7584, 192.1819]
    //   ],
    //   [
    //     [70.7578, -115.0072],
    //     [-30.7584, 200.1764]
    //   ],
    //   [
    //     [70.7578, -115.0072],
    //     [-30.7584, 200.1237]
    //   ]
    // ])

    $.get({
      url: `https://dialoc-server.herokuapp.com/location`,
      headers: {
        'Authorization': localStorage.token}
      }
    })
      .then((res) => {console.log(res)}).then(() => addFavorites([
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
      ])).then(() => initialize(
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
          ]));



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



})
