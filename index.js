const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss.js');

// ayoooo callback hell
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

    if (error) {
      console.log("It didn't work!" , error);
      return;
    }

    console.log(latLong);

    // call and use fetchISSFlyOverTimes function and feed it the latlongf etchCoordsByIP() returned
    fetchISSFlyOverTimes(latLong, ((error, flyoverTimes) => {
      
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log(flyoverTimes);
    }));
  }));
});
