const SpotifyRequest = require('./SpotifyRequest');
const init = require('./spotify.init.js');

const push = ({ name, device }) => ({
    name,
    type: 'push',
    category: 'music',
    tag: name,
    sensor: false,
    identifier: `${name}:${device.id}`,
    min: 0,
    max: 1,
});
module.exports = function setup() {
    return SpotifyRequest({
            url: 'https://api.spotify.com/v1/me/player/devices'
        })
        .then(player => player.devices.map(device => ({
            device: {
                name: `Spotify ${device.name}`,
                protocol: `http`,
                service: `gladys-spotify`,
                identifier: device.id
            },
            types: [
                push({ name: 'next', device }),
                push({ name: 'pause', device }),
                push({ name: 'play', device }),
                push({ name: 'previous', device }),
                {
                name: `Volume`,
                type: 'music',
                category: 'music',
                tag: 'volume',
                identifier: `volume:${device.id}`,
                unit: '%',                
                sensor: false,
                min: 0,
                max: 100
            }]
        })))
        .then(devices => Promise.all(devices.map(gladys.device.create)))
        .then(() => console.info('[gladys-spotify][info]', 'setup with success'))
        .then(() => init())
        .catch(error => console.error('[gladys-spotify][error]', error.error))

};