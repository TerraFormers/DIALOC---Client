$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

const API_URL = 'http://localhost:3000'

// function getHostURL(){
//   if ( window.location.host.indexOf('localhost') != -1 ) {
//     return 'http://localhost:3000';
//   } else {
//     return 'https://www.herokuapp.com';
//   }
// }
