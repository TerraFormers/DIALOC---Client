var wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
var wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
var rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'


$(() => {
  $('.modal-btn').click(() => {
    addSatImages()
  })
})

function addSatImages() {
  let twoPoints = [originalLocation, antipodeLocation];
  let maxZoom = 9;
  for (let i = 0; i < 2; i++) {
    let e = {lat: twoPoints[i][0], lng: twoPoints[i][1]};
    console.log(twoPoints[i])
    console.log($('.modal-img-sat')[i])
    let maxZoomService = new google.maps.MaxZoomService();
    maxZoomService.getMaxZoomAtLatLng(e, function(response) {
      console.log($('.modal-img-sat')[i])
      maxZoom = response.zoom;
      $('.modal-img-sat')[i].src= `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${twoPoints[i].toString()}&zoom=${maxZoom}&size=350x350&key=${rpSatKey}`
    })
  }
}


// let src = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${originalLocation}&fov=90&heading=235&pitch=10&key=${wmStreetViewKey}`
// let src2 = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${antipodeLocation}&fov=90&heading=235&pitch=10&key=${wmStreetViewKey}`


// $.get(src, (x)=>{
//   console.log(x.length)
// })
// $.get(src2, (x)=>{
//   console.log(x.length)
// })
//  $('.modal-img-original').attr('src', src)
//   $('.modal-img-antipode').attr('src', src2)

// if (findIMGsize(src) == true) {
//   console.log(findIMGsize(src))
//   $('.modal-img-original').attr('src', src)
// } else {
//   console.log(findIMGsize(src))
//   console.log('no')
// }
// if (findIMGsize(src2) == true) {
//   console.log(findIMGsize(src2))
//   $('.modal-img-antipode').attr('src', src2)
// } else {
//   console.log('no')
// }


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
