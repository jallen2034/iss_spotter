const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {

  const ipifyUrl = 'https://api.ipify.org?format=json';
  // use request to fetch IP address from JSON API
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

// export the function fetchMyIP to be called and used at the index
module.exports = { fetchMyIP };