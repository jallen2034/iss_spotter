const request = require('request');

// Makes a single API request to retrieve the user's IP address.Input:
// A callback (to pass back an error or the IP string)
// Returns (via Callback):
// An error, if any (nullable)
// The IP address as a string (null if error). Example: "162.245.144.188"
// use request to fetch IP address from JSON API
const fetchMyIP = function(callback) {

  const ipifyUrl = 'https://api.ipify.org?format=json';
  request(ipifyUrl, (error, response, body) => {

    // inside the request callback ...
    // error can be set if there is an invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // if a non-200 status code is sent back from the server, assume there is a server error
    // force the error to be sent to the callback as the first incoming paramater
    if (response.statusCode !== 200) {
      const msg = `${response.statusCode} wasencountered when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    // call our callback function from line 4 of our index.js and pass it out any errors or the body from our http request
    // parse the IP as JSON to be interpereted later
    // force the formatted ipAddress to be sent to the callback as the first incoming paramater
    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress);
  });
};


// function that makes a single API request to retrieve the user's geo location based on their IP address.
// in the function, make the request to the API, and have it pass back the relevant (lat/lng) data as an object via callback.
// https://freegeoip.app/json/216.180.65.66?callback=test
const fetchCoordsByIP = function(ip, callback) {

  console.log("ip: " + ip);
  const geoLocationUrl = `https://freegeoip.app/json/${ip}`;

  request(geoLocationUrl, (error, response, body) => {

    // inside the request callback ...
    // error can be set if there is an invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // if a non-200 status code is sent back from the server, assume there is a server error
    // force the error to be sent to the callback as the first incoming paramater
    if (response.statusCode !== 200) {
      const msg = `${response.statusCode} wasencountered when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // parse the .latitute and .long in the JSOn object returned from the.replace(/(?:\[rn])+/g, '')
    const parsedBody = JSON.parse(body);
    const latLong = {lat: parsedBody.latitude, long: parsedBody.longitude}
    callback(null, latLong);
  });
}

// export the function fetchMyIP to be called and used at the index
module.exports = { fetchMyIP: fetchMyIP, fetchCoordsByIP: fetchCoordsByIP };