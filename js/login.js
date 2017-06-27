console.log(API_URL);

$(() => {
  $('#loginUser').on('click', () => {

    const $email = $('#email').val();
    const $password = $('#password').val();

    const formBody = {
      email: $email,
      password: $password
    }

    $.post(`${API_URL}/auth/login`, formBody).then((response) => {
        console.log(response);
        $(location).attr('href', `/user.html?id=${response.id}`);
    }).catch((error) => {
        console.log('Error!')
    });
  });
});
