$(() => {
  $('#createUser').on("click", () => {

    const $name = $('#name-input').val();
    const $email = $('#email').val();
    const $password = $('#password').val();

    const formBody = {
      name: $name,
      email: $email,
      password: $password
    }

    $.post('http://localhost:3000/auth/signup', formBody).then((response) => {
        console.log(response);
        $(location).attr('href', `/user.html?id=${response.id}`);
    }).catch((error) => {
        console.log('Error!, Invalid User Entry')
    });
  });
});
