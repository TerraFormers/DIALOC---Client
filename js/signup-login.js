$(() => {

  $.ajaxSetup({
    crossDomain: true,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `${localStorage.token}`
    }
  });

  $("#submit").on("click", function() {
    $("#failMessage").hide();
    let newUser = {
      "name": $("#name-input").val(),
      "email": $("#email").val(),
      "password": $("#password").val()
    };
    let path = this.dataset.page;
    fetchPost(`https://dialoc-server.herokuapp.com/${path}`, newUser)
          // signup(user)
          .then(result => {
            localStorage.token= `Bearer ${result.token}`
            // localStorage.id= re
            window.location.href = `user.html?id=${result.id}`})
            .catch(error => {
            console.log(error)
          })
    // $.post(`https://dialoc-server.herokuapp.com/${path}`, newUser).then((res) => window.location.href = `user.html?id=${res.user.id}`).fail(() => $("#failMessage").show());
  });
});



// fetchPost(`https://dialoc-server.herokuapp.com/${path}`, newUser)
//       // signup(user)
//       .then(result => {
//         window.location.href = `user.html?id=${res.user.id}`).fail(() => $("#failMessage").show());
//       }).catch(error => {
//         console.log(error)
//         $('.error-message').text(error.responseJSON.message)
//         $('#error-modal').modal('open')
//       })
