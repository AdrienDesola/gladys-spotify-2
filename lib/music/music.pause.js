const SpotifyRequest = require('../SpotifyRequest');
module.exports = ({ deviceType }) => SpotifyRequest({ deviceType, method: 'put', url: 'https://api.spotify.com/v1/me/player/pause' })