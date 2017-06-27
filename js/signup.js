$(() => {
  $("#submit").on("click", function () {
    let newUser = {
      "name": $("#name-input").val(),
      "email": $("#email").val(),
      "password": $("#password").val()
    };
    $.post("https://dialocserver-api.herokuapp.com/auth/signup", newUser).then(() => window.location.href = "user.html");
  });
});
