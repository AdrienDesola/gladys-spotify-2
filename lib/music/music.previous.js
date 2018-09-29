const SpotifyRequest = require('../SpotifyRequest');
module.exports = ({ deviceType }) => SpotifyRequest({ deviceType, method: 'POST', url: 'https://api.spotify.com/v1/me/player/previous' })