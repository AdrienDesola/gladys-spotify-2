const Request = require('request-promise-native');
const shared = require('./shared.js');
const loadDevices = require('./spotify.loadDevices');
urlMaker = (url, device) => {
  if (!device) return url;
  if (~url.indexOf('?')) return url + `&device_id=${device.id}`
  else return url + `?device_id=${device.id}`
}

module.exports = SpotifyRequest = async ({
  method = 'get',
  url,
  deviceType,
  body
}) => {
  if(deviceType && !shared.instances[deviceType.device]) {
    await loadDevices;
  }
  return Request[method.toLowerCase()]({
    url: urlMaker(url, deviceType && shared.instances[deviceType.device]),
    headers: {
      'Authorization': `Bearer ${shared.access_token}`,
      'Content-Type': 'application/json'
    },
    body,
    json: true
  })
}