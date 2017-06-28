$(() => {
  $("#submit").on("click", function() {
    $("#failMessage").hide();
    let newUser = {
      "name": $("#name-input").val(),
      "email": $("#email").val(),
      "password": $("#password").val()
    };
    let path = this.dataset.page;

    $.post(`https://dialocserver-api.herokuapp.com/auth/${path}`, newUser).then((res) => window.location.href = `user.html?id=${res.id}`).fail(() => $("#failMessage").show());
  });
});
