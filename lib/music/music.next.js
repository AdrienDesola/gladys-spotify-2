const SpotifyRequest = require('../SpotifyRequest');
module.exports = ({ deviceType }) => SpotifyRequest({ deviceType, method: 'post', url: 'https://api.spotify.com/v1/me/player/next' })