const SpotifyRequest = require('../SpotifyRequest');
module.exports = ({ deviceType }) => SpotifyRequest({
    deviceType,
    method: 'get',
    url: 'https://api.spotify.com/v1/me/playlists'
  })
  .then(player => {
    if(!player || player.device.id !== deviceType.identifier) return false;
    return player.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name
    }))
  })