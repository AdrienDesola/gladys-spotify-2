const SpotifyRequest = require('../SpotifyRequest');
module.exports = ({ deviceType }) => SpotifyRequest({ deviceType, method: 'get', url: 'https://api.spotify.com/v1/me/player' })
.then(player => {
    if(!player || player.device.id !== deviceType.identifier) return false;
  const cover = player.item.album.images.find( i => i.height == 300 )
  return {
    title: player.item.name,
    artist: player.item.artists.map(artist => artist.name).join(' & '),
    album: player.item.album.name,
    cover: cover && cover.url
  }
})
