const SpotifyRequest = require('../SpotifyRequest');
module.exports = ({
    deviceType
  }) => SpotifyRequest({
    deviceType,
    method: 'get',
    url: 'https://api.spotify.com/v1/me/player'
  })
  .then((player) => {
    if(!player || player.device.id !== deviceType.identifier) return Promise.reject('not-the-identifier');
    return SpotifyRequest({
      deviceType,
      method: 'get',
      url: player.context.href
    })
  })
  .then((player => {
    if(!player.tracks) return []
    return player.tracks.items.map(item => ({
        title: item.track.name,
        artist: item.track.artists.map(artist => artist.name).join(' & '),
        album: item.track.album.name
    }))
  }))
  .catch(error => {
    if(error === 'not-the-identifier') Promise.resolve();
    else Promise.reject(error);
  })