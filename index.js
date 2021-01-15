// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss.js');

// return values error and ip in this callback function are already being handled in the backburner/event queue
fetchMyIP((error, ip) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  console.log(typeof ip);

  // call and use fetchCoordsByIP function and feed it the IP address we got back from our server
  fetchCoordsByIP(ip, ((error, latLong) => {
    console.log(latLong);
  }));
});
