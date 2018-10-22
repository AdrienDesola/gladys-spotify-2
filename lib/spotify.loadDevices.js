const shared = require('./shared');
const Request = require('request-promise-native');

module.exports = () => {
  return Promise.all([
      gladys.device.getByService({
        service: 'gladys-spotify'
      }),
      Request.get({
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: {
          'Authorization': `Bearer ${shared.access_token}`,
          'Content-Type': 'application/json'
        },
        json: true
      })
    ])
    .then(([gladysDevices, {
      devices = []
    }]) => {
      // reset all instances 
      shared.instances = {};
      // foreach device, create an instance
      gladysDevices.forEach(function (device) {
        shared.instances[device.id] = devices.find(sdevice => sdevice.id === device.identifier)
      });
      console.log(shared)
      return shared.instances;
    })
}