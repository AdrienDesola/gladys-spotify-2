const SpotifyRequest = require('../SpotifyRequest');
module.exports = ({ deviceType }) => SpotifyRequest({ deviceType, method: 'get', url: 'https://api.spotify.com/v1/me/player' })
.then(player => {
  if(!player || player.device.id !== deviceType.identifier) return false;
  return { muted: !player.device.volume_percent }
})
