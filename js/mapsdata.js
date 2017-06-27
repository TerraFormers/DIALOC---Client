var wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
var wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
var rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'


// `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${a}&zoom=18&size=350x350&key=`

$(() => {

  $('.modal-btn').click(() => {
    // let src = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${originalLocation}&fov=90&heading=235&pitch=10&key=${wmStreetViewKey}`
    // let src2 = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${antipodeLocation}&fov=90&heading=235&pitch=10&key=${wmStreetViewKey}`
    let src = `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${originalLocation}&zoom=18&size=350x350&key=${rpSatKey}`
    let src2 = `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${antipodeLocation}&zoom=18&size=350x350&key=${rpSatKey}`

    // $.get(src, (x)=>{
    //   console.log(x.length)
    // })
    // $.get(src2, (x)=>{
    //   console.log(x.length)
    // })
    //  $('.modal-img-original').attr('src', src)
    //   $('.modal-img-antipode').attr('src', src2)

    if (findIMGsize(src) == true) {
      console.log(findIMGsize(src))
      $('.modal-img-original').attr('src', src)
    } else {
      console.log(findIMGsize(src))
      console.log('no')
    }
    if (findIMGsize(src2) == true) {
      console.log(findIMGsize(src2))
      $('.modal-img-antipode').attr('src', src2)
    } else {
      console.log('no')
    }
  })

  // function modal btn

  // function findIMGsize(src) {
  //   $.get(src, (x) => {
  //     if (x.length > 6000) {
  //       console.log(x.length)
  //       console.log(true)
  //     } else {
  //       y = false
  //     }
  //     return y
  //   }).then()
  //   return y
  // }

  function findIMGsize(src) {
  let y = false
    $.get(src, (x) => {
        console.log(x.length)
      })
      .then((x) => {

        if (x.length > 6000) {
          console.log(x.length)
          y = true
        }
        return y
      })
      return y
  }





  // var map;
  // var service;
  // var infowindow;
  //
  // function initialize() {
  //   var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
  //
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: pyrmont,
  //     zoom: 15
  //   });
  //
  //   var request = {
  //     location: pyrmont,
  //     radius: '500',
  //     type: ['restaurant']
  //   };
  //
  //   service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch(request, callback);
  // }
  //
  // function callback(results, status) {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       var place = results[i];
  //       createMarker(results[i]);
  //     }
  //   }
  // }
})
