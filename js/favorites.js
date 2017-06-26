$(() => {

  function addFavoriteImage(homeCoords, hero = false) {
    let imgURL = [];
    for (let i = 0; i < 2; i++) {
      console.log(homeCoords[i]);
      imgURL.push(`https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${homeCoords[i].toString()}&zoom=18&size=350x350&key=AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk`);
    }
    if (hero) {
      $("#favImage").prepend(`<div style="padding:1%" class="col s12 card-panel amber lighten-1 row valign-wrapper activator">
          <div class="col s6">
            <img src="${imgURL[0]}" alt="" class="circle responsive-img favorite-img">
          </div>
          <div class="col s6">
            <img src="${imgURL[1]}" alt="" class="circle responsive-img favorite-img">
          </div>
        </div>`);
    } else {
      $("#favImage").append(`<div class="lessImage col s5 card-panel amber lighten-5 valign-wrapper activator">
          <div class="col s6">
            <img src="${imgURL[0]}" alt="" class="circle responsive-img favorite-img">
          </div>
          <div class="col s6">
            <img src="${imgURL[1]}" alt="" class="circle responsive-img favorite-img">
          </div>
        </div>`);
    }
  }

  addFavoriteImage([
    [39.7578, -105.0072],
    [-44.75844900784497, 192.18194032285464]
  ], true)
  addFavoriteImage([
    [50.7578, -105.0072],
    [-50.75844900784497, 192.18194032285464]
  ])
  addFavoriteImage([
    [70.7578, -115.0072],
    [-30.75844900784497, 200.18194032285464]
  ])
  addFavoriteImage([
    [70.7578, -115.0072],
    [-30.75844900784497, 200.18194032285464]
  ])

})
