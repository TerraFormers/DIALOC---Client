$(() => {

  const wmStreetViewKey = 'AIzaSyCuPQR1KWE3uYIoml6bzBOTrA78iVIeaRI'
  const wmPlacesKey = 'AIzaSyDBNBysOcc4ZOhnnHVW_LSMSYBgn9p1YE4'
  const wmRegMapsKey = 'AIzaSyBWwNKenoShzQRdzvj8Ifobvl4fYzR4kXs'
  const wmGeocodingKey = 'AIzaSyDwVSMTSddT1ABkgp8YwzsH7qcqKms2U18'
  const rpSatKey = 'AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk'

  const databaseURL = 'https://dialoc-server.herokuapp.com/'

  const earth = new WE.map('earth_div_markers_all')
  WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth)
  earth.setView([39.7578, -105.0072], .8);

  $.ajaxSetup({
    crossDomain: true,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `${localStorage.token}`
    }
  });

  $.get(`${databaseURL}location`).then((res) => {
    return res
  }).then((data) => {
    let sortedData = data.sort((a, b) => {
      return b.rating - a.rating
    })
    // console.log(sortedData)

    function format(num) {
      return parseFloat(num.toFixed(3))
    }

    function antipode(coord) {
      let mapAntip = [-1 * coord[0], coord[1] - 180]
      return [format(mapAntip[0]), format(mapAntip[1])]
    }
    let inputCoords = []
    for (let i of sortedData) {
      inputCoords.push([format(i.latitude), format(i.longitude)])
    }
    let bothCoords = inputCoords.map((set) => {
      return [set, antipode(set)]
    })
    return [bothCoords, data]
  }).then((info) => {
    // console.log(info)
    $('.rating').show()
    return Promise.all([addFavorites(info[0], info[1]),
      setMarkers(info[0])
    ]).then(() => {
      $('.hero').click((e) => {
        e.stopPropagation()
        $('#modal2').modal('open')
        // console.log(e.target)
        // console.log(JSON.parse($('.hero').attr('data-json')))
        let info = JSON.parse($('.hero').attr('data-json'))
        $('.modal-img-original').attr('src', $('.hero-img').first().attr('src'))
        $('.modal-img-antipode').attr('src', $('.hero-img').last().attr('src'))
        $('.original-coords').text($('.hero-coords').first().text())
        $('.antipode-coords').text($('.hero-coords').last().text())

      })
      $('.lesser-clicka').click((e) => {
        // e.stopPropagation()
        // $('#modal2').modal('open')
        console.log(e.target)
      })

      $('.rating').click((e) => {
        e.stopPropagation()
        console.log(e.target)
        let info = JSON.parse($('.hero').attr('data-json'))
        let rating = parseFloat($('.upvote-count').first().text())
        // $('.upvote-count').first().text(`${data[i].rating}`)
        let newRating = rating + 1
        console.log(newRating)
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": `${databaseURL}location`,
          "method": "PUT",
          "headers": {
            "content-type": "application/json",
            "authorization": `${localStorage.token}`,
          },
          "data": JSON.stringify({
            "id": info.id
          })
        };

        $.ajax(settings).done(function(response) {
          console.log(response);

        }).then(
          // window.location.reload()
          // $('.rating').reload()
          $('.upvote-count').first().text(newRating)
        )
      })
    })
  })


  function setMarkers(coords) {
    return coords.forEach((coord) => {
      let markerCustom = WE.marker(coord[0], '/images/bullet_orange.png', 8, 8).addTo(earth)
      let markerCustom2 = WE.marker(coord[1], '/images/bullet_pink.png', 8, 8).addTo(earth)
    })
  }

  function addFavorites(favorites, data) {

    for (let i in favorites) {
      // console.log(data[i])
      addFavSatImages(favorites[i]).then((urls) => {
        let coords = favorites[i]
        let att = JSON.stringify(data[i])
        if (i == 0) {
          $('.hero').attr('data-json', att)
          $('.rating').first().attr('data-json', att)
          $('.upvote-count').first().text(`${data[i].rating}`)
          let heroContainer = $('<div class="hero-container"></div>')
          $('.hero-container-master').prepend(heroContainer)
          for (let i in urls) {
            $('.hero-container').append(`
              <div class="hero-img-container">
                <img src="${urls[i]}" alt="" class="circle responsive-img favorite-img hero-img">
                <p class="white roundedBorder font-source hero-coords" style="border: 1px solid red;">${coords[i].join(', ')}</p>
              </div>`)
          }
        } else {
          // console.log(data[i])
          let contain = $('<div class="col s6 lesser-clickable" ></div>')
          let favsContainer = $(`<div class="lesser-fav roundedBorder" data-json="${att}">

          <div data-json="${att}" class=" white center  rating"><span class="center"><h5 class="upvote-count font-source">${data[i].rating}</h5><br><a class="upvote-btn lesser-upvote-btn"><i class="material-icons small center black-text thumb">thumb_up</i></a></span></div></div></div>`)

          let actualContainer = $(`<div class ="lesser-actual-contain"> `)
          $('.lesser-favs-master').append(contain.append(favsContainer.prepend(actualContainer)))
          for (let j in urls) {
            actualContainer.append($(`<div class="lesser-img-container">
              <img src="${urls[j]}" alt="" class="circle responsive-img favorite-img hero-img">
              <p class="font-source"> ${coords[j][0]},<br>${coords[j][1]}</p>
            </div>`))
          }
        }

      })
    }

  }

})
