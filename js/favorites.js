$(() => {
  function addFavoriteImage(homeCoords, hero = false) {
    let imgURL = [];
    for (let i = 0; i < 2; i++) {
      console.log(homeCoords[i]);
      imgURL.push(`https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${homeCoords[i].toString()}&zoom=18&size=350x350&key=AIzaSyAiB8Q6zW5qm1u2d5LKrT98udr4wbQKEuk`);
    }
    if (hero) {
      $("#favImage").prepend(`<a href="#modal1" style="padding:1%" class="col s12 card-panel amber lighten-1 row valign-wrapper activator">
          <div class="col s6">
            <img src="${imgURL[0]}" alt="" class="circle responsive-img favorite-img">
            <p class="red-text">${homeCoords[0]}</p>
          </div>
          <div class="col s6">
            <img src="${imgURL[1]}" alt="" class="circle responsive-img favorite-img">
            <p class="red-text">${homeCoords[1]}</p>
          </div>
        </a>`);
    } else {
      $("#favImage").append(`<a href="#modal1" class="lessImage col s5 card-panel amber lighten-5 valign-wrapper activator">
          <div class="col s6">
            <img src="${imgURL[0]}" alt="" class="circle responsive-img favorite-img">
            <p class="red-text">${homeCoords[0]}</p>
          </div>
          <div class="col s6">
            <img src="${imgURL[1]}" alt="" class="circle responsive-img favorite-img">
            <p class="red-text">${homeCoords[1]}</p>
          </div>
        </a>`);
    }
    $('.modal').modal();
    $(".activator").on("click", function() {
        console.log(this);
        $("#modalBody").html("");
        $("#modalBody").html(`Enter Info Here`);
      });
  }

  addFavoriteImage([
    [39.7578, -105.0072],
    [-44.7584, 192.1819]
  ], true)
  addFavoriteImage([
    [50.7578, -105.0072],
    [-50.7584, 192.1819]
  ])
  addFavoriteImage([
    [70.7578, -115.0072],
    [-30.7584, 200.1819]
  ])
  addFavoriteImage([
    [70.7578, -115.0072],
    [-30.7584, 200.1819]
  ])

})
