$(() => {
  var wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
  var wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
  $('.modal-btn').click(() => {
    $('.modal-img-original').attr('src', `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${originalLocation}&fov=90&heading=235&pitch=10&key=${wmStreetViewKey}`)
    $('.modal-img-antipode').attr('src', `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${antipodeLocation}&fov=90&heading=235&pitch=10&key=${wmStreetViewKey}`)
  })



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
