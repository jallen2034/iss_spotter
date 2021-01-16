// iss_promised.js
const request = require('request-promise-native');

// This function should only have one line of code: its only job is to fetch the IP address from the API
// and return it where needed
const fetchMyIP = function() {
  // doccumentation for how this works???
  // this returns the wntire promise object (not just the body!!!)
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ip) {
  // why are we doing this here? This ip was parsed on line 33 of your previous version
  const geoLocationUrl = `https://freegeoip.app/json/${ip}`;
  return request(geoLocationUrl);
};

const fetchISSFlyOverTimes = function(coords) {
  const flyoverUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.long}`;
  return request(flyoverUrl);
};

// export needed modules
module.exports = { fetchMyIP: fetchMyIP, fetchCoordsByIP: fetchCoordsByIP, fetchISSFlyOverTimes: fetchISSFlyOverTimes };